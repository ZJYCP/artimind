'use client'
import InputArea from '@/components/search/inputArea'
import { useEffect, useRef, useState } from 'react'
import { useSearchStore } from '@/store/SearchStore'
import { Search } from '@/lib/bizTypes'
import { createNewMessage } from '@/lib/llm/utils'
import { generateUUID } from '@/lib/utils'
import useSSE from '@/hooks/useSSE'

interface AskPanelProps {
  // 搜索id
  searchId: string
}
function AskPanel(props: AskPanelProps) {
  const { searchId } = props
  const [question, setQuestion] = useState('')
  const { data, error, isOpen, start, close } = useSSE()
  const [url, setUrl] = useState('/api/v2/search')
  const assistantResponseFirstFlag = useRef(true)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const {
    searches,
    activeId,
    addSearch,
    activeSearch,
    setActiveById,
    updateActiveSearch,
  } = useSearchStore()

  const sendMessage = (searchWithNewMessage: Search) => {
    console.log('sendMessage', searchWithNewMessage)
    start(url, {
      body: JSON.stringify({
        searchRecord: searchWithNewMessage,
      }),
    })
  }
  const updateMessage = (messageContent: string) => {
    // 如果是新的消息，则添加到messages中
    let updateMessages = []
    const activeSearch = useSearchStore.getState().activeSearch
    if (assistantResponseFirstFlag.current) {
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
      assistantResponseFirstFlag.current = false
    } else {
      updateMessages = activeSearch.messages.map((message, index) => {
        if (index === activeSearch.messages.length - 1) {
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
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }
    updateMessage(data.answer)
  }, [data])

  useEffect(() => {
    if (isOpen) {
      assistantResponseFirstFlag.current = true
    }
  }, [isOpen])

  const sendHandler = () => {
    const activeSearchSync = useSearchStore.getState().activeSearch
    const newUserMessage = createNewMessage({
      id: generateUUID(),
      title: question,
    })[0]
    const searchWithNewMessage = {
      ...activeSearchSync,
      messages: [...activeSearchSync.messages, newUserMessage],
    }
    updateActiveSearch(searchWithNewMessage)
    sendMessage(searchWithNewMessage)
  }

  return (
    <div className="w-1/2 absolute bottom-4 left-1/2 transform -translate-x-1/4">
      <InputArea
        question={question}
        onQuestionInput={(v) => setQuestion(v)}
        onSend={sendHandler}
      ></InputArea>
    </div>
  )
}

export default AskPanel
