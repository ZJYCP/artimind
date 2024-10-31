'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { cross } from '@/lib/cross'

export default function Search() {
  // id of the search
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = (await cross('/api/v1/search', {
          method: 'POST',
          data: {
            message: id,
          },
        })) as { message: string }
        setMessage(data.message)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMessage()
    return () => {}
  }, [id])

  return <div>{message}</div>
}
