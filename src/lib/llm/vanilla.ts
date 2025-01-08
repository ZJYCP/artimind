import { ImageSource, Message, TextSource, VideoSource } from '@/lib/bizTypes'
import { streamText, tool } from 'ai'
import { getOpenAI } from '@/lib/aiProvider'
import { z } from 'zod'
import { tavilySearch } from '@/lib/searchEngine'
import { SearchResultImage } from '@/lib/searchEngine/serchEngine.interface'
import { streamResponse } from '@/lib/llm/utils'
import { directlyAnswer } from '@/lib/llm/directlyAnswer'
import { getHistory } from '@/lib/utils'
import { AutoAnswerPrompt } from '@/lib/llm/prompt'

export async function vanillaAnswer(
  messages: Message[],
  onStream?: (...args: any[]) => void
) {
  const vanillaModel = await getOpenAI()

  let fullAnswer = ''

  let textSources: TextSource[] = []
  let imageSources: ImageSource[] = []
  let videoSources: VideoSource[] = []

  const query = messages[messages.length - 1].content

  const result = await streamText({
    model: vanillaModel,
    maxSteps: 1,
    maxRetries: 0,
    messages: [
      {
        role: 'system',
        content: AutoAnswerPrompt,
        experimental_providerMetadata: {
          anthropic: { cacheControl: { type: 'ephemeral' } },
        },
      },
      ...messages,
    ],
    tools: {
      searchWeb: tool({
        description: `search web to answer user's question, rephrase and translate the question before calling this tool.`,
        parameters: z.object({
          question: z.string().describe(`the user's question to search for`),
        }),
        execute: async ({ question }) => tavilySearch(question, { onStream }),
      }),
    },
  })

  let hasAnswer = false
  let rewriteQuery = query
  let toolCallCount = 0
  let hasError = false
  for await (const delta of result.fullStream) {
    switch (delta.type) {
      // case 'step-finish': {
      //   console.log(
      //     'step is continued',
      //     delta.isContinued,
      //     ' finish reason ',
      //     delta.finishReason
      //   )
      //   break
      // }
      case 'text-delta': {
        if (delta.textDelta) {
          if (!hasAnswer) {
            hasAnswer = true
            onStream?.(
              JSON.stringify({
                status: 'Answering ...',
              })
            )
          }
          fullAnswer += delta.textDelta
          onStream?.(JSON.stringify({ answer: delta.textDelta }))
        }
        break
      }
      case 'tool-call':
        toolCallCount++
        onStream?.(
          JSON.stringify({
            status: 'Searching ...',
          })
        )
        break
      case 'tool-result':
        if (delta.toolName === 'searchWeb') {
          textSources = textSources.concat(delta.result.results)
          imageSources = imageSources.concat(delta.result.images)
          console.log(`rewrite ${rewriteQuery} to ${delta.args.question}`)
          rewriteQuery = delta.args.question
        }
        break
      case 'error': {
        hasError = true
        onStream?.(JSON.stringify({ error: delta.error }))
        onStream?.(null, true)
        break
      }
    }
  }
  if (toolCallCount > 0) {
    rewriteQuery = query
    await streamResponse(
      { sources: textSources, status: 'Thinking ...' },
      onStream
    )
  }

  const history = getHistory(true, messages)

  if (toolCallCount > 0) {
    await streamResponse({ status: 'Answering ...', clear: true }, onStream)

    await directlyAnswer(
      history,
      vanillaModel,
      query,
      textSources,
      (resMsg) => {
        fullAnswer += resMsg
        onStream?.(JSON.stringify({ answer: resMsg }))
      },
      (errMsg) => {
        hasError = true
        onStream?.(JSON.stringify({ error: errMsg }))
        onStream?.(null, true)
      }
    )
  }

  onStream?.(null, true)

  return { fullAnswer, textSources }
}
