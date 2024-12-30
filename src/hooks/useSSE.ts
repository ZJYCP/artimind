import { useState, useEffect, useRef } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'

function useSSE(url, options = {}) {
  const [data, setData] = useState(null) // 当前接收的数据
  const [error, setError] = useState(null) // 错误信息
  const [isOpen, setIsOpen] = useState(false) // SSE 状态
  const controllerRef = useRef(null) // 用于手动关闭连接

  useEffect(() => {
    // 初始化 AbortController
    const controller = new AbortController()
    controllerRef.current = controller

    const { signal } = controller

    setIsOpen(true)

    // 使用 fetchEventSource 发起 SSE 请求
    fetchEventSource(url, {
      ...options,
      signal,
      onopen: async () => {
        console.log('SSE connection opened')
        setIsOpen(true)
      },
      onmessage: (event) => {
        try {
          const parsedData = JSON.parse(event.data)
          setData(parsedData)
        } catch (e) {
          setData(event.data) // 如果不是 JSON，直接存储原始数据
        }
      },
      onerror: (err) => {
        console.error('SSE error:', err)
        setError(err)
        controller.abort()
        setIsOpen(false)
      },
      onclose: () => {
        console.log('SSE connection closed')
        setIsOpen(false)
      },
    })

    // 清理逻辑
    return () => {
      controller.abort()
      console.log('SSE connection manually closed')
    }
  }, [url, options])

  return {
    data,
    error,
    isOpen,
    close: () => {
      controllerRef.current?.abort()
      setIsOpen(false)
    },
  }
}

export default useSSE
