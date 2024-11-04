'use client'
import { useSearchParams } from 'next/navigation'
import { useChat } from 'ai/react'
import { useEffect } from 'react'
import { cross } from '@/lib/cross'
import { SearchRecordVO } from '@/dto/SearchRecord'
import { Message } from 'ai'
import { Button } from '@/components/ui/button'

async function getSearchRecord(id: string) {
  return await cross<SearchRecordVO>('/api/v1/search/record', {
    data: { id },
  })
}

export default function MainSearch() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { messages, input, setInput, setMessages, handleSubmit } = useChat({
    api: '/api/v1/search',
  })

  function searchHandler() {
    handleSubmit(null, {
      data: {
        searchId: id,
      },
    })
  }

  useEffect(() => {
    searchHandler()
  }, [input])

  useEffect(() => {
    async function setInitMessage() {
      const recordVO = await getSearchRecord(id)
      if (recordVO.finished) {
        setMessages(recordVO.messages)
      } else {
        setInput(recordVO.question)
      }
    }
    setInitMessage()
  }, [])
  return (
    <div>
      {messages.map((message) => {
        return (
          <div key={message.id ?? Math.random()}>
            {message.role === 'user' ? 'User' : 'AI'}
            {message.content}
          </div>
        )
      })}
    </div>
  )
}
