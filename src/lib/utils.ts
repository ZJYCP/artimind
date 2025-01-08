import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID() {
  return crypto.randomUUID()
}

/**
 * Sanitize URL
 * @param url
 */
export function sanitizeUrl(url: string): string {
  return url.replace(/\s+/g, '%20')
}

/**
 * 获取历史消息的函数
 * 根据用户是否是专业版，返回格式化的历史消息字符串
 * 专业版用户可以看到更多历史消息
 *
 * @param isPro 用户是否是专业版布尔值
 * @param messages 消息数组，包含多个消息对象
 * @returns 返回格式化后的历史消息字符串
 */
export function getHistory(isPro: boolean, messages: any[]) {
  const sliceNum = isPro ? -7 : -3
  return messages
    ?.slice(sliceNum, -1)
    .map((msg) => {
      if (msg.role === 'user') {
        return `User: ${msg.content}`
      } else if (msg.role === 'assistant') {
        return `Assistant: ${msg.content}`
      } else if (msg.role === 'system') {
        return `System: ${msg.content}`
      }
      return ''
    })
    .join('\n')
}
