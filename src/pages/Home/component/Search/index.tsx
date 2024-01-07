import { SearchEngine } from './component/SearchEngine'
import { SearchInput } from './component/SearchInput'
import { SearchRedirect } from './component/SearchRedirect'
import { SearchSuggestion } from './component/SearchSuggestion'

import { useCallback, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { useSuggestion } from '@/hooks/useSuggestion'
import { useRedirect } from '@/hooks/useRedirect'
import { storeSearchHistory } from '@/store/searchHistory'

/**
 * Search
 */
export const Search = () => {

  const [value, setValue] = useState('')

  const [keyword, setKeyword] = useState('')

  const [selectedIndex, setSelectedIndex] = useState(-1)

  const { suggestionResult } = useSuggestion(keyword)

  const { searchEngine, toRedirect } = useRedirect()

  const { clearSearchHistory } = storeSearchHistory()

  useEffect(() => {
    setSelectedIndex(-1)
  }, [suggestionResult])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {

    if (!value.trim()) return

    switch (event.key) {
      case 'ArrowDown':
        if (suggestionResult?.length) {
          setSelectedIndex((prev) => {
            const index = (prev >= (suggestionResult.length - 1)) ? 0 : ++prev

            setValue(suggestionResult[index])

            return index
          })
        }

        break
      case 'ArrowUp':
        event.preventDefault()
        if (suggestionResult?.length) {
          setSelectedIndex((prev) => {
            const index = (prev <= 0) ? (suggestionResult.length - 1) : --prev

            setValue(suggestionResult[index])

            return index
          })
        }
        break
      case 'Enter': {

        if (value === '--clear --history') {
          clearSearchHistory()
          setValue('')
          setKeyword('')
          return
        }

        (event.ctrlKey) ? toRedirect(value, true) : toRedirect(value)
        break
      }

    }
  }, [suggestionResult, value])

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setKeyword(event.target.value)

  }, [])

  const onClear = useCallback(() => {
    setValue('')
    setKeyword('')
  }, [])

  const handleSearchSuggestionClick = useCallback((event: React.MouseEvent | React.KeyboardEvent, keyword: string) => {
    if (event.ctrlKey) {
      toRedirect(keyword, true)
    } else {
      toRedirect(keyword)
    }
  }, [keyword])

  const handleSearchRedirectClick = useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
    if (event.ctrlKey) {
      toRedirect(value, true)
    } else {
      toRedirect(value)
    }
  }, [searchEngine, value])

  const handleSearchSuggestionMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const handleSearchSuggestionMouseLeave = useCallback(() => {
    setSelectedIndex(-1)
  }, [])

  console.log('layout')

  return (
    <div
      className={clsx([
        'relative flex items-center gap-x-1 bg-neutral-50 px-2 py-1.5 dark:bg-neutral-800',
        (suggestionResult?.length ? 'rounded-t-lg' : 'rounded-lg')
      ])}
      tabIndex={0}
    >
      {/* Engine */}
      <SearchEngine />
      {/* Input */}
      <SearchInput
        onChange={onChange}
        onClear={onClear}
        onKeyDown={handleKeyDown}
        value={value}
      />
      {/* Search */}
      <SearchRedirect
        onClick={handleSearchRedirectClick}
      />
      {/* Suggestion */}
      <SearchSuggestion
        data={suggestionResult}
        onClick={handleSearchSuggestionClick}
        onMouseEnter={handleSearchSuggestionMouseEnter}
        onMouseLeave={handleSearchSuggestionMouseLeave}
        selected={selectedIndex}
      />
    </div>
  )
}