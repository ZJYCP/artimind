import { Message } from 'ai'

export class SearchRecordDTO {
  public searchId: string
  public messages: string
  public createdBy: string
  public question: string
  constructor(data: {
    searchId: string
    createdBy: string
    question: string
    messages: Message[]
  }) {
    this.searchId = data.searchId
    this.createdBy = data.createdBy
    this.question = data.question
    this.messages = JSON.stringify(data.messages)
  }
}
