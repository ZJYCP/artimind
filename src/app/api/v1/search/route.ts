import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI } from '@/lib/aiProvider'
import { streamText } from 'ai'
import logger from '@/lib/logger'
export async function POST(req: NextRequest) {
  const openai = await getOpenAI()
  const { messages } = await req.json()

  logger.info(messages)
  const result = await streamText({
    model: openai('claude-3-haiku-20240307'),
    messages,
  })
  return result.toDataStreamResponse()
}
