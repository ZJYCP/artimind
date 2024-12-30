import { Search } from '@/lib/bizTypes'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SearchState {
  searches: Search[]
  activeSearch: Search | null
  activeId: string | null
  addSearch: (search: Search) => void
  setActiveById: (id: string | null) => void
  // 更新当前活跃搜索的内容
  updateActiveSearch: (updateData: Partial<Search>) => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      searches: [],
      activeId: null,
      activeSearch: null,
      addSearch: (search) => {
        set((state) => {
          const existingSearchIndex = state.searches.findIndex(
            (s) => s.id === search.id
          )
          if (existingSearchIndex !== -1) {
            // 替换现有的搜索
            return {
              searches: state.searches.map((s, index) =>
                index === existingSearchIndex ? search : s
              ),
              activeSearch: search,
            }
          }
          // 添加新的搜索
          return {
            searches: [search, ...state.searches],
            activeSearch: search,
          }
        })
      },
      setActiveById: (id: string) => {
        set((state) => {
          const search = state.searches.find((s) => s.id === id)
          return {
            activeId: id,
            activeSearch: search,
          }
        })
      },
      updateActiveSearch: (updateData) => {
        set((state) => {
          const updatedSearch = {
            ...state.activeSearch,
            ...updateData,
          }
          return {
            activeSearch: updatedSearch,
          }
        })
      },
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        searches: state.searches.slice(0, 100),
      }),
    }
  )
)
