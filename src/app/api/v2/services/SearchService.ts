import prisma from '@/lib/prisma'
import logger from '@/lib/logger'
import { Search } from '@/lib/bizTypes'

class SearchService {
  static async createSearch(data) {
    try {
      return await prisma.search.create({
        data: {
          sharePath: '',
          ...data,
        },
      })
    } catch (e) {
      logger.error(e)
    }
  }
}

export default SearchService
