import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI } from '@/lib/aiProvider'
import { streamText } from 'ai'
import logger from '@/lib/logger'
import { Message } from 'ai'
import prisma from '@/lib/prisma'
export async function POST(req: NextRequest) {
  const openai = await getOpenAI()
  const { messages, data } = await req.json()

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
    onFinish({ text, finishReason, usage }) {
      updateRecord(text, data.searchId, messages)
    },
  })
  return result.toDataStreamResponse()
}

/**
 * 结束搜索记录
 * @param text
 * @param id
 * @param messages
 */
async function updateRecord(text: string, id: string, messages: Message[]) {
  await prisma.searchRecord.update({
    where: {
      searchId: id,
    },
    data: {
      finished: true,
      messages: JSON.stringify(
        messages.concat([
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: text,
            createdAt: new Date(),
          },
        ])
      ),
    },
  })
}
