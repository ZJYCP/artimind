'use client'
import { useSearchParams } from 'next/navigation'
import { useChat } from 'ai/react'
import { useEffect } from 'react'
import { cross } from '@/lib/cross'

async function getSearchRecord(id: string) {
  return await cross('/api/v1/search/getRecord', {
    data: { id },
  })
}

export default function MainSearch() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { messages, input, setInput, setMessages, handleSubmit } = useChat({
    api: '/api/v1/search',
  })

  useEffect(() => {
    const message = getSearchRecord(id)
  }, [])
  return (
    <div>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            {message.role === 'user' ? 'User' : 'AI'}
            {message.content}
          </div>
        )
      })}
    </div>
  )
}
