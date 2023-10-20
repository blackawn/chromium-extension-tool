import { SearchEngine } from './component/SearchEngine'
import { SearchInput } from './component/SearchInput'
import { SearchRedirect } from './component/SearchRedirect'
import { SearchSuggestion } from './component/SearchSuggestion'

import { useCallback, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { useStateCallback } from '@/hooks/useStateCallback'
import { useSuggestion } from '@/hooks/useSuggestion'
import { useRedirect } from '@/hooks/useRedirect'

/**
 * Search
 */
export const Search = () => {

  const [value, setValue] = useStateCallback('')

  const [keyword, setKeyword] = useState('')

  const { suggestionResult } = useSuggestion(keyword)

  const { searchEngine, toRedirect } = useRedirect()

  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    setSelectedIndex(-1)
  }, [suggestionResult])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {

    if (!suggestionResult || !value.trim()) return

    switch (event.key) {
      case 'ArrowDown':
        setSelectedIndex((prev) => {
          const index = (prev >= (suggestionResult.length - 1)) ? 0 : ++prev

          setValue(suggestionResult[index])

          return index
        })
        break
      case 'ArrowUp':
        event.preventDefault()
        setSelectedIndex((prev) => {
          const index = (prev <= 0) ? (suggestionResult.length - 1) : --prev

          setValue(suggestionResult[index])

          return index
        })
        break
      case 'Enter':
        (event.ctrlKey) ? toRedirect(value, true) : toRedirect(value)
        return
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
        'relative flex items-center gap-x-1 px-2 py-1.5 dark:bg-neutral-800',
        (suggestionResult ? 'rounded-t-lg' : 'rounded-lg')
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