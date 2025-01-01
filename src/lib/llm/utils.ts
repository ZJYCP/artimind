import { Message, Search as SearchVO, Search } from '@/lib/bizTypes'
import { useSearchStore } from '@/store/SearchStore'

const encoder = new TextEncoder()

export const streamController =
  (controller) => (message: string | null, done: boolean) => {
    if (done) {
      controller.close()
    } else {
      const payload = `data: ${message} \n\n`
      controller.enqueue(encoder.encode(payload))
    }
  }

export async function streamResponse(
  data: Record<string, any>,
  onStream?: (...args: any[]) => void
) {
  for (const [key, value] of Object.entries(data)) {
    onStream?.(JSON.stringify({ [key]: value }))
  }
}

export function createNewSearch(vo: Partial<SearchVO>) {
  const questionId = crypto.randomUUID()
  return new SearchVO(questionId, vo.title, vo.createdBy)
}

/**
 * 根据搜索对象创建新的消息数组
 * @param originSearch 搜索对象，包含id和title属性
 * @returns 返回一个包含一个消息对象的数组
 */
export function createNewMessage(originSearch: Partial<Search>): Message[] {
  // 创建一个消息对象，其中包含搜索对象的id和title，并将title作为消息内容，同时初始化一个空的附件数组
  return [
    {
      id: originSearch.id,
      content: originSearch.title,
      role: 'user',
      attachments: [],
    },
  ]
}
