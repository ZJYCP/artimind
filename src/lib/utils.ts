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

import { randomBytes, createHash } from 'crypto'

/**
 * 生成盐和哈希密码
 * @param text 要加密的文本
 * @param salt 可选的盐，若未提供，则会自动生成
 * @returns 包含盐和哈希值的对象
 */
export function saltAndHashText(text: string, salt?: string) {
  // 如果未提供盐，则生成随机盐
  const generatedSalt = salt || randomBytes(16).toString('hex')

  // 使用 SHA-256 算法生成哈希
  const hash = createHash('sha256')
    .update(text + generatedSalt)
    .digest('hex')

  return {
    salt: generatedSalt,
    hash,
  }
}
