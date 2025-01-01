'use client'
import InputArea from '@/components/search/inputArea'
import useSSE from '@/hooks/useSSE'
import { useState } from 'react'
import { useSearchStore } from '@/store/SearchStore'
import { createNewSearch } from '@/lib/llm/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from '@/i18n/routing'

export default function Search() {
  const { data: session } = useSession()
  const [question, setQuestion] = useState('')
  const router = useRouter()
  const { addSearch } = useSearchStore()

  const sendHandler = () => {
    const searchRecord = createNewSearch({
      title: question,
      createdBy: session?.user?.id,
    })
    addSearch(searchRecord)
    router.push(`/search/${searchRecord.id}`)
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-full  px-4">
      {/* 标题和描述 */}
      <div className="text-3xl font-bold text-gray-800 mb-2">AI 搜索</div>
      <p className="text-lg text-gray-600 mb-6">实时资讯，丰富信源，整合搜索</p>

      <InputArea
        onSend={sendHandler}
        question={question}
        onQuestionInput={(v) => setQuestion(v)}
      ></InputArea>
    </div>
  )
}
