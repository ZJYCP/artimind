'use server'
import { SearchRecordDTO } from '@/dto/SearchRecord'
import prisma from '@/lib/prisma'
import logger from '@/lib/logger'
export async function createSearchRecord(question: string) {
  const uuid = crypto.randomUUID()
  const searchRecord = new SearchRecordDTO({
    searchId: uuid,
    question: question,
    messages: [
      {
        id: uuid,
        content: question,
        role: 'user',
      },
    ],
    createdBy: 'dev-test',
  })
  logger.info('新增一条记录', question)
  try {
    await prisma.searchRecord.create({
      data: searchRecord,
    })
    return uuid
  } catch (e) {
    logger.error(e)
  }
}
