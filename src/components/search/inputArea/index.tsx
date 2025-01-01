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

interface InputAreaProps {
  question: string
  onQuestionInput: (question: string) => void
  onSend: () => void
}
function InputArea(props: InputAreaProps) {
  const { question, onQuestionInput, onSend } = props

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onQuestionInput(e.target.value)
  }
  return (
    <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-sm p-4 space-y-4">
      {/* 输入框 */}
      <Textarea
        className="w-full resize-none border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 rounded-md"
        placeholder="搜索、提问或发送消息"
        rows={3}
        value={question}
        onInput={handleInputChange}
      />
      {/* 下方操作区域 */}
      <div className="flex items-center justify-between">
        {/* 左侧选择器 */}
        <div className="flex space-x-4">
          <Select>
            <SelectTrigger className="flex items-center text-gray-600 text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <span className="mr-2">🌐</span>
              <SelectValue placeholder="全网搜索" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">全网搜索</SelectItem>
              <SelectItem value="local">本地搜索</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="flex items-center text-gray-600 text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500">
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
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md"
          onClick={onSend}
        >
          发送
        </Button>
      </div>
    </div>
  )
}

export default InputArea
