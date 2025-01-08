/**
 * 用户信息
 */
export interface CompleteUser {
  id: string
  name: string
  email: string
  image: string
}

export type User = Partial<CompleteUser>

/**
 * 会话信息
 */
export interface Message {
  id: string
  role: 'system' | 'user' | 'assistant'
  content: string
  createdAt?: Date
  updatedAt?: Date
  type?: string
  imageFile?: string
  attachments?: string[]
  sources?: TextSource[]
  images?: ImageSource[]
  videos?: VideoSource[]
  related?: string
}

export interface TextSource {
  title: string
  url: string
  content: string
  type?: string
}

export interface ImageSource {
  title: string
  url: string
  image: string
  type?: string
}

export interface VideoSource {
  title: string
  id: string
}

export class Search {
  id: string
  title: string
  createdAt: Date = new Date()
  updatedAt: Date = new Date()
  createdBy: string = ''
  messages: Message[] = []
  sharePath?: string

  constructor(id: string, title: string, createdBy: string) {
    this.id = id
    this.title = title
    this.createdBy = createdBy
  }
}

export interface TextSource {
  title: string
  url: string
  content: string
  type?: string
}

export interface ImageSource {
  title: string
  url: string
  image: string
  type?: string
}

export interface VideoSource {
  title: string
  id: string
}

export interface StreamHandler {
  (message: string | null, done: boolean): void
}
