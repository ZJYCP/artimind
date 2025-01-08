import { ImageSource, TextSource } from '@/lib/bizTypes'

/**
 * 搜索引擎结果
 */
export type SearchResults = {
  images: ImageSource[]
  results: TextSource[]
  number_of_results?: number
  query: string
}

// If enabled the include_images_description is true, the images will be an array of { url: string, description: string }
// Otherwise, the images will be an array of strings
export type SearchResultImage =
  | string
  | {
      url: string
      description: string
      number_of_results?: number
    }
