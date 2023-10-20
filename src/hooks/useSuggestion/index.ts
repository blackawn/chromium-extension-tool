import { useEffect, useState } from 'react'
import type { BaiduCallback, BingCallback, GoogleCallback, SuggestionResultList } from './types'
import { storeSearchEngine } from '@/store/searchEngine'
import axios from 'axios'
import json5 from 'json5'

export function useSuggestion(keyword: string) {

  const { searchEngine = 'baidu' } = storeSearchEngine()

  const [suggestionResult, setSuggestionResult] = useState<SuggestionResultList>(undefined)

  useEffect(() => {

    if (keyword.trim() === '') return setSuggestionResult(undefined)

    const timer = setTimeout(() => {

      switch (searchEngine) {
        case 'baidu':
          axios.get(`https://suggestion.baidu.com/su?wd=${keyword}&p=true`)
            .then((result) => {
              const replaceResult = result.data.replace('window.baidu.sug(', '').replace(');', '')
              const paresResult = json5.parse(replaceResult) as BaiduCallback
              if (paresResult.s) {
                setSuggestionResult(paresResult.s)
              }
            })
          break
        case 'bing':
          axios.get(`https://api.bing.com/qsonhs.aspx?type=cb&q=${keyword}`)
            .then((result) => {
              const replaceResult = result.data.replace('if(typeof  == \'function\') (', '').replace('/* pageview_candidate */);', '')
              const paresResult = json5.parse(replaceResult) as BingCallback
              if (paresResult.AS.FullResults) {
                const mergeResult = paresResult.AS.Results.map((suggest) => {
                  return suggest.Suggests.map((item) => item.Txt)
                })

                setSuggestionResult(mergeResult.flat())
              }
            })
          break
        case 'google':
          axios.get(`https://suggestqueries.google.com/complete/search?output=toolbar&client=chrome&q=${keyword}`)
            .then((result) => {
              const data = result.data as GoogleCallback
              if (data[1]) {
                setSuggestionResult(data[1])
              }
            })
          break
        default:
          break
      }

    }, 300)

    return () => {
      clearTimeout(timer)
    }

  }, [searchEngine, keyword])

  return {
    suggestionResult
  }
}