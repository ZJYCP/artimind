import { useState, useRef, useCallback } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'

function useSSE() {
  const [data, setData] = useState(null) // 当前接收的数据
  const [error, setError] = useState(null) // 错误信息
  const [isOpen, setIsOpen] = useState(false) // SSE 状态
  const controllerRef = useRef(null) // 用于手动关闭连接

  const start = useCallback((url, options = {}) => {
    // 如果连接已存在，先关闭
    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    // 初始化 AbortController
    const controller = new AbortController()
    controllerRef.current = controller

    const { signal } = controller

    setIsOpen(true)
    console.log(options)

    fetchEventSource(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
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
  }, [])

  const close = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort()
      setIsOpen(false)
      console.log('SSE connection manually closed')
    }
  }, [])

  return { data, error, isOpen, start, close }
}

export default useSSE
