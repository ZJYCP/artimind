import { Message } from '@/lib/bizTypes'
import { streamResponse } from './utils'
import { streamText } from 'ai'
import { getOpenAI } from '@/lib/aiProvider'

export async function vanillaAnswer(
  messages: Message[],
  onStream?: (...args: any[]) => void
) {
  const vanillaModel = await getOpenAI()
  let fullAnswer = ''
  const result = await streamText({
    model: vanillaModel,
    messages: messages,
  })
  // 流式输出结果
  for await (const text of result.textStream) {
    fullAnswer += text
    onStream?.(JSON.stringify({ answer: text }))
  }

  onStream?.(null, true)
  return fullAnswer
}
