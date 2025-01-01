import { NextRequest, NextResponse } from 'next/server'
import { vanillaAnswer } from '@/lib/llm/vanilla'
import { Search } from '@/lib/bizTypes'
import { streamController } from '@/lib/llm/utils'
import SearchService from '@/app/api/v2/services/SearchService'
import { generateUUID } from '@/lib/utils'
import logger from '@/lib/logger'

export async function POST(req: NextRequest) {
  const { searchRecord } = await req.json()
  const messages = (searchRecord as Search).messages
  try {
    const readableStream = new ReadableStream({
      async start(controller) {
        const fullAnswer = await vanillaAnswer(
          messages,
          streamController(controller)
        )
        if (messages.length < 2) {
          console.log('没有，need create')
          await SearchService.createSearch({
            ...searchRecord,
            messages: [
              ...messages,
              {
                id: generateUUID(),
                content: fullAnswer,
                role: 'assistant',
                attachments: [],
              },
            ],
          })
        } else {
          console.log('已经有了，need upadte' + '')
          await SearchService.updateSearchMessage(searchRecord.id, [
            ...messages,
            {
              id: generateUUID(),
              content: fullAnswer,
              role: 'assistant',
              attachments: [],
            },
          ])
        }
      },
      cancel() {
        console.log('Stream canceled by client')
      },
    })
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (e) {
    return NextResponse.json(
      {
        error: e,
      },
      {
        status: 500,
      }
    )
  }
}
