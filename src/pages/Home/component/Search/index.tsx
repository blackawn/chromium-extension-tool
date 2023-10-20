import { SearchEngine } from './component/SearchEngine'
import { SearchInput } from './component/SearchInput'
import { SearchRedirect } from './component/SearchRedirect'
import { SearchSuggestion } from './component/SearchSuggestion'

import { useEffect, useState } from 'react'
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

  const { toRedirect } = useRedirect()

  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    setSelectedIndex(-1)
  }, [suggestionResult])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (!suggestionResult.length || !value.trim()) return

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
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setKeyword(event.target.value)
  }

  const onClear = ()=>{
    setValue('')
    setKeyword('')
  }

  const handleSearchSuggestionClick = (event: React.MouseEvent | React.KeyboardEvent, keyword: string) => {
    if (event.ctrlKey) {
      toRedirect(keyword, true)
    } else {
      toRedirect(keyword)
    }
  }

  const handleSearchRedirectClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (event.ctrlKey) {
      toRedirect(value, true)
    } else {
      toRedirect(value)
    }
  }

  console.log('layout')

  return (
    <div
      className={clsx([
        'relative flex w-[466px] items-center gap-x-1 px-2 py-1.5 dark:bg-neutral-800',
        ((suggestionResult.length > 0) ? 'rounded-t-lg' : 'rounded-lg')
      ])}
      tabIndex={0}
    >
      {/* Engine */}
      <SearchEngine />
      {/* Input */}
      <SearchInput
        onBlur={() => setKeyword('')}
        onChange={onChange}
        onClear={onClear}
        onFocus={() => setKeyword(value)}
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
        onClick={(e, keyword) => handleSearchSuggestionClick(e, keyword)}
        onMouseEnter={(index) => setSelectedIndex(index)}
        onMouseLeave={() => setSelectedIndex(-1)}
        selected={selectedIndex}
      />
    </div>
  )
}