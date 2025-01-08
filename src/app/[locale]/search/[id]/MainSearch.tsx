'use client'
import { useSearchStore } from '@/store/SearchStore'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Message, Search, User } from '@/lib/bizTypes'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import AMarkdown from '@/components/common/markdown'
import useSSE from '@/hooks/useSSE'
import { createNewMessage } from '@/lib/llm/utils'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/ui/spinner'

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

  const [searchStatus, setSearchStatus] = useState<null | string>(null)

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
        const { answer, status } = JSON.parse(event.data)
        if (answer) {
          setSearchStatus(null)
          updateMessage(answer)
        }
        if (status) {
          setSearchStatus(status)
        }
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
      {messages.map((message, index) => {
        const isUser = message.role === 'user'
        return (
          <div
            key={message.id}
            className={cn(
              'flex w-full py-4',
              isUser ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'px-6 py-3 rounded-lg shadow-lg',
                isUser
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none',
                'dark:bg-gray-700 dark:text-gray-200', // 深色模式适配
                'max-w-[75%] sm:max-w-[60%] lg:max-w-[50%]' // 限制宽度的自适应
              )}
            >
              <span
                className={cn(
                  'block text-sm font-medium mb-1',
                  isUser ? 'text-white' : 'text-gray-600',
                  'dark:text-gray-400' // 深色模式下的发件人标识颜色
                )}
              >
                {isUser ? 'You' : 'AI'}
              </span>
              <AMarkdown content={message.content}></AMarkdown>
            </div>
          </div>
        )
      })}
      {!!searchStatus && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Spinner className="h-4 w-4 text-blue-500" />
          {searchStatus}
        </div>
      )}
    </>
  )
}

export default MainSearch
