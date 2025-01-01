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

  static async updateSearchMessage(id, messages) {
    try {
      return await prisma.search.update({
        where: {
          id: id,
        },
        data: {
          messages,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  static async updateSearch(data) {
    try {
      return await prisma.search.update({
        where: {
          id: data.id,
        },
        data,
      })
    } catch (e) {
      logger.error(e)
    }
  }
}

export default SearchService
