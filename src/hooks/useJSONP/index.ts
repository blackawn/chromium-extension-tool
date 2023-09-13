import { useEffect, useState } from 'react'
import type { SearchEngineName } from '@/store/searchEngine/types'

export function useJSONP(engine: SearchEngineName = 'baidu', value: string) {

  const [suggestionResult, setSuggestionResult] = useState<Array<string>>()

  useEffect(() => {

    if (value.trim() === '') return setSuggestionResult([])

    window.searchEngine = {
      baidu(result) {
        if (result.s) {
          setSuggestionResult(result.s)
        }
      },
      bing(result) {
        if (result.AS.FullResults) {
          const mergeResult = result.AS.Results.map((suggest) => {
            return suggest.Suggests.map((item) => item.Txt)
          })

          setSuggestionResult(mergeResult.flat())
        }
      },
      google(result) {
        if (result[1]) {
          setSuggestionResult(result[1])
        }
      },
    }

    const scriptNode = document.createElement('script')

    switch (engine) {
      case 'baidu':
        scriptNode.src = `https://suggestion.baidu.com/su?wd=${value}&p=true&cb=window.searchEngine.baidu`
        break
      case 'bing':
        scriptNode.src = `https://api.bing.com/qsonhs.aspx?type=cb&q=${value}&cb=window.searchEngine.bing`
        break
      case 'google':
        scriptNode.src = `https://suggestqueries.google.com/complete/search?output=toolbar&client=chrome&q=${value}&jsonp=window.searchEngine.google`
        break
      default:
        break
    }

    document.body.appendChild(scriptNode)

    scriptNode.onload = () => {
      console.log('加载完成')
      scriptNode.remove()
    }

    scriptNode.onerror = () => {
      console.log('加载失败')
      setSuggestionResult([])
      scriptNode.remove()
    }

    return () => {
      if (scriptNode) {
        scriptNode.remove()
      }
    }

  }, [engine, value])

  return {
    suggestionResult
  }
}