import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type SearchHistorySort = 'desc' | 'asc';

export interface SearchKeyword {
  keyword: string
  count: number
  time: number
}

interface SearchHistory {
  searchHistory: Array<SearchKeyword>
  addSearchHistory: (keyword: string) => void
}

export const storeSearchHistory = create<SearchHistory>()(
  persist(
    ((set) => ({
      searchHistory: [],
      addSearchHistory: (keyword) => set((state) => {

        const isExist = state.searchHistory?.findIndex((item) => item.keyword === keyword)

        const historyResult = [...state.searchHistory]

        if (isExist !== -1) {
          historyResult.splice(isExist, 1)
        }
        
        historyResult.unshift({
          keyword: keyword,
          count: state.searchHistory[isExist]?.count + 1 || 1,
          time: Date.now()
        })

        return {
          searchHistory: historyResult
        }
      }),
    })),
    {
      name: 'searchHistory-storage',
      storage: createJSONStorage(() => localStorage)
    })

)