'use client'
import { useSearchStore } from '@/store/SearchStore'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Message, Search, User } from '@/lib/bizTypes'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import AMarkdown from '@/components/common/markdown'
import useSSE from '@/hooks/useSSE'
import { createNewMessage } from '@/lib/llm/utils'
import { cn } from '@/lib/utils'

interface MainSearchProps {
  initSearchInfo: Search | null
  searchId: string
  user: User
}

function MainSearch(props: MainSearchProps) {
  const { initSearchInfo, searchId, user } = props
  const {
    searches,
    activeId,
    addSearch,
    activeSearch,
    setActiveById,
    updateActiveSearch,
  } = useSearchStore()

  const messageIndex = useRef<number>(-1)

  /**
   * 当搜索id在数据库中不存在，即第一次搜索时，主动发起请求
   */
  useEffect(() => {
    // initSearchInfo为空，则表明是初次提出问题，需要发起请求
    if (!initSearchInfo) {
      setActiveById(searchId)
      const activeSearchSync = useSearchStore.getState().activeSearch
      const newSearch = {
        ...activeSearchSync,
        messages: createNewMessage(activeSearchSync),
      }
      addSearch(newSearch)
      sendMessage(newSearch)
    } else {
      addSearch(initSearchInfo)
    }
  }, [])

  const sendMessage = async (search: Search) => {
    await fetchEventSource('/api/v2/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        searchRecord: search,
      }),
      onmessage: (event) => {
        const { answer } = JSON.parse(event.data)
        updateMessage(answer)
      },
    })
  }

  const updateMessage = (messageContent: string) => {
    // 如果是新的消息，则添加到messages中
    let updateMessages = []
    const activeSearch = useSearchStore.getState().activeSearch
    if (messageIndex.current === -1) {
      updateActiveSearch({
        messages: [
          ...activeSearch.messages,
          {
            id: crypto.randomUUID(),
            content: messageContent,
            role: 'assistant',
          },
        ],
      })
      messageIndex.current = activeSearch.messages.length
    } else {
      updateMessages = activeSearch.messages.map((message, index) => {
        if (index === messageIndex.current) {
          return {
            ...message,
            content: message.content + messageContent,
          }
        }
        return message
      })
      updateActiveSearch({
        messages: updateMessages,
      })
    }
  }

  const messages = activeSearch?.messages || []

  return (
    <>
      {messages.map((message) => {
        const isUser = message.role === 'user'
        return (
          <div
            key={message.id}
            className={cn(
              'flex flex-col py-4',
              isUser ? 'items-end' : 'items-start'
            )}
          >
            {isUser ? 'User' : 'AI'}
            <AMarkdown content={message.content}></AMarkdown>
          </div>
        )
      })}
    </>
  )
}

export default MainSearch
