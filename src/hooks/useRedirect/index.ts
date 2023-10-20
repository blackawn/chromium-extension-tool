import { storeSearchHistory } from '@/store/searchHistory'
import { storeSearchEngine } from '@/store/searchEngine'
import type { SearchEngineType } from '@/hooks/useRedirect/types'
import { useMemo } from 'react'

export const useRedirect = () => {

  const searchEngineList = useMemo<SearchEngineType>(() => (
    {
      'baidu': {
        url: 'https://www.baidu.com/s?wd='
      },
      'bing': {
        url: 'https://www.bing.com/search?q='
      },
      'google': {
        url: 'https://www.google.com/search?q='
      }
    }
  ), [])

  const { searchEngine } = storeSearchEngine()
  const { addSearchHistory } = storeSearchHistory()

  const toRedirect = (q: string, newTab?: boolean) => {

    if (!q.trim()) return

    const redirectUrl = searchEngineList[searchEngine].url + q

    addSearchHistory(q)
    if (newTab) {
      window.open(redirectUrl, '_blank')
    } else {
      window.location.href = redirectUrl
    }
  }

  return {
    toRedirect
  }
}