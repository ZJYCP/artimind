'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useSignInModal } from '@/hooks/useSignInModal'

interface InputAreaProps {
  question: string
  onQuestionInput: (question: string) => void
  onSend: () => void
}
function InputArea(props: InputAreaProps) {
  const { question, onQuestionInput, onSend } = props
  const { data: session } = useSession()
  const signInModal = useSignInModal()

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onQuestionInput(e.target.value)
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // 阻止换行
      beforeSendHandler()
    }
  }

  const beforeSendHandler = () => {
    if (session?.user) {
      onSend()
      onQuestionInput('')
    } else {
      signInModal.onOpen()
    }
  }
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm p-4 space-y-4">
      {/* 输入框 */}
      <Textarea
        className="w-full resize-none border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        placeholder="搜索、提问或发送消息"
        rows={3}
        value={question}
        onInput={handleInputChange}
        onKeyDown={keyDownHandler}
      />
      {/* 下方操作区域 */}
      <div className="flex items-center justify-between">
        {/* 左侧选择器 */}
        <div className="flex space-x-4">
          <Select>
            <SelectTrigger className="flex items-center text-gray-600 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800">
              <span className="mr-2">🌐</span>
              <SelectValue placeholder="全网搜索" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">全网搜索</SelectItem>
              <SelectItem value="local">本地搜索</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="flex items-center text-gray-600 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800">
              <span className="mr-2">📁</span>
              <SelectValue placeholder="分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="news">新闻</SelectItem>
              <SelectItem value="images">图片</SelectItem>
              <SelectItem value="videos">视频</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 右侧发送按钮 */}
        <Button
          className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 px-6 py-2 rounded-md"
          onClick={beforeSendHandler}
        >
          发送
        </Button>
      </div>
    </div>
  )
}

export default InputArea
