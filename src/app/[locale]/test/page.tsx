'use client'

import React, { useState, useRef, useCallback, useMemo } from 'react'

const ROW_HEIGHT = 30 // 每行的固定高度
const VISIBLE_COUNT = 20 // 可视区域内的行数

function Page() {
  // 生成 20 万条 IP 数据
  const data = useMemo(
    () =>
      Array.from({ length: 200000 }, () =>
        Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(
          '.'
        )
      ),
    []
  )

  const [startIndex, setStartIndex] = useState(0) // 当前起始索引
  const [editingIndex, setEditingIndex] = useState<number | null>(null) // 正在编辑的行索引
  const [inputValue, setInputValue] = useState('') // 当前编辑中的值
  const [searchTerm, setSearchTerm] = useState('') // 搜索关键字
  const [searchResults, setSearchResults] = useState<number[]>([]) // 搜索结果索引列表
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0) // 当前高亮的搜索结果索引

  const containerRef = useRef<HTMLDivElement>(null)

  // 滚动事件处理，计算起始索引
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop
      const newIndex = Math.floor(scrollTop / ROW_HEIGHT)
      setStartIndex(newIndex)
    }
  }, [])

  // 搜索逻辑
  const handleSearch = () => {
    const results = data
      .map((item, index) => (item.includes(searchTerm) ? index : -1))
      .filter((index) => index !== -1)
    setSearchResults(results)
    setCurrentSearchIndex(0)
    if (results.length > 0) scrollToIndex(results[0])
  }

  // 滚动到指定行
  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = index * ROW_HEIGHT
      setStartIndex(Math.floor(containerRef.current.scrollTop / ROW_HEIGHT))
    }
  }

  // 搜索结果的上下导航
  const handleNavigateSearch = (direction: 'prev' | 'next') => {
    if (searchResults.length === 0) return
    const newIndex =
      direction === 'next'
        ? (currentSearchIndex + 1) % searchResults.length
        : (currentSearchIndex - 1 + searchResults.length) % searchResults.length
    setCurrentSearchIndex(newIndex)
    scrollToIndex(searchResults[newIndex])
  }

  // 保存编辑后的值
  const saveEdit = useCallback(
    (index: number) => {
      if (editingIndex !== null) {
        data[editingIndex] = inputValue
        setEditingIndex(null)
        setInputValue('')
      }
    },
    [editingIndex, inputValue, data]
  )

  // 渲染单行
  const renderRow = (index: number) => {
    const isEditing = index === editingIndex
    const isSearchResult = searchResults.includes(index)
    const isCurrentResult = index === searchResults[currentSearchIndex]

    return (
      <div
        key={index}
        style={{
          height: ROW_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          backgroundColor: isCurrentResult
            ? '#ffd700'
            : isSearchResult
              ? '#f0f8ff'
              : 'white',
          position: 'absolute',
          top: index * ROW_HEIGHT,
          width: '100%',
        }}
        onClick={() => {
          setEditingIndex(index)
          setInputValue(data[index])
        }}
      >
        {/*<span*/}
        {/*  contentEditable={'plaintext-only'}*/}
        {/*  onInput={(e) => setInputValue(e.target.textContent || '')}*/}
        {/*  onBlur={() => saveEdit(index)}*/}
        {/*>*/}
        {/*  {data[index]}*/}
        {/*</span>*/}
        {isEditing ? (
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => saveEdit(index)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
            }}
            autoFocus
          />
        ) : (
          // <span
          //   contentEditable={'plaintext-only'}
          //   onChange={(e) => setInputValue(e.target.value)}
          //   onBlur={() => saveEdit(index)}
          // >
          //   {inputValue}
          // </span>
          <span>{data[index]}</span>
        )}
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索..."
          style={{ marginRight: 10, padding: '5px', width: '200px' }}
        />
        <button onClick={handleSearch} style={{ marginRight: 10 }}>
          搜索
        </button>
        <button
          onClick={() => handleNavigateSearch('prev')}
          style={{ marginRight: 10 }}
        >
          上一个
        </button>
        <button onClick={() => handleNavigateSearch('next')}>下一个</button>
      </div>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: `${ROW_HEIGHT * VISIBLE_COUNT}px`,
          overflowY: 'auto',
          position: 'relative',
          border: '1px solid #ddd',
        }}
        onScroll={handleScroll}
      >
        {/* 虚拟容器，用于撑开滚动区域 */}
        <div
          style={{
            height: `${data.length * ROW_HEIGHT}px`,
            position: 'relative',
          }}
        >
          {/* 渲染可见区域的行 */}
          {Array.from({ length: VISIBLE_COUNT + 1 }).map((_, i) => {
            const index = startIndex + i
            if (index >= data.length) return null
            return renderRow(index)
          })}
        </div>
      </div>
    </div>
  )
}

export default Page
