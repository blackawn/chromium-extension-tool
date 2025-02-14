import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { SearchEngineName } from '@/hooks/useRedirect/types'

interface SearchEngineState {
  searchEngine: SearchEngineName
  modifySearchEngine: (searchEngine: SearchEngineName) => void
}

export const storeSearchEngine = create<SearchEngineState>()(
  persist(
    ((set) => ({
      searchEngine: 'baidu',
      modifySearchEngine: (searchEngine) => set({ searchEngine })
    })),
    {
      name: 'searchEngine-storage',
      storage: createJSONStorage(() => localStorage)
    })

)