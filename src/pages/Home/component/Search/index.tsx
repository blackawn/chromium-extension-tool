import icon_baidu from '@/assets/baidu.svg'
import icon_bing from '@/assets/bing.svg'
import icon_google from '@/assets/google.svg'
import { Icon } from '@iconify/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchEngineStore } from '@/store/searchEngine'
import { clsx } from 'clsx'
import { useJSONP } from '@/hooks/useJSONP'
import type { SearchEngine } from '@/store/searchEngine/types'

interface SearchEngineProps {

}

const SearchEngine = (props: unknown) => {

  const searchEngineList = useMemo<SearchEngine[]>(() => ([
    {
      icon: icon_baidu,
      name: 'baidu'
    },
    {
      icon: icon_bing,
      name: 'bing'
    },
    {
      icon: icon_google,
      name: 'google'
    }
  ]), [])

  const { searchEngine, modifySearchEngine } = useSearchEngineStore()

  const currentEngine = useMemo(() => {
    return searchEngineList.find((obj) => obj.name === searchEngine)?.icon
  }, [searchEngine, searchEngineList])

  return (
    <div
      className='group relative flex select-none items-center'
      tabIndex={0}
    >
      <div
        className='h-11 w-11 cursor-pointer rounded-full p-1.5 hover:bg-neutral-500/20'
      >
        <img
          alt=''
          className='h-full w-full object-cover'
          src={currentEngine}
        />
      </div>
      <div
        className={clsx([
          'absolute right-full w-max origin-right overflow-hidden duration-300',
          'invisible translate-x-0 scale-0 opacity-0',
          'group-focus:visible group-focus:-translate-x-5 group-focus:scale-100 group-focus:opacity-100'
        ])}
      >
        <div
          className={clsx([
            'grid grid-cols-3 gap-2 rounded-md bg-neutral-800 p-4',
          ])}
        >
          {searchEngineList.map(({ icon, name }) => (
            <div
              className={clsx([
                'h-7 w-7 cursor-pointer duration-300',
                (searchEngine === name ? 'grayscale-0' : 'grayscale-[0.95]')
              ])}
              key={name}
              onClick={() => modifySearchEngine(name)}
            >
              <img
                alt=''
                className='h-full w-full object-cover'
                src={icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface SearchBarProps {
  modifySuggestion: (data: Array<string>) => void
}

const SearchBar = (props: SearchBarProps) => {

  const [value, setValue] = useState('')

  const [keyword, setKeyword] = useState('')

  const { searchEngine } = useSearchEngineStore()

  const { suggestionResult } = useJSONP(searchEngine, keyword)

  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (value.trim() === '') {
      setKeyword('')
      props.modifySuggestion([])
    } else {
      props.modifySuggestion(suggestionResult as string[])
    }
  }, [suggestionResult, value])
  
  const onInput = (value: string) => {

    setValue(value)

    clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      setKeyword(value)
    }, 500)
  }

  return (
    <div
      className='flex flex-1'
    >
      <div
        className='flex-1'
      >
        <input
          autoComplete=''
          className='h-full w-full bg-transparent text-lg tracking-wide outline-none'
          onChange={(e) => onInput(e.target.value)}
          placeholder=''
          type='text'
          value={value}
        />

      </div>
      <div
        className={clsx([
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xl duration-300 hover:bg-neutral-500/20',
          ((value.trim().length > 0) ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0')
        ])}
        onClick={() => setValue('')}
      >
        <Icon
          icon='ic:round-close'
        />
      </div>
    </div>
  )
}

interface SearchSuggestionProps {
  data: Array<string>
}

const SearchSuggestion = (props: SearchSuggestionProps) => {
  return (
    (props.data.length > 0) && (
      <div
        className='absolute left-0 top-full mt-2 flex w-full flex-col rounded-md bg-neutral-800 p-4 py-1'
      >
        {
          props.data.map((item, i) => (
            <div
              key={i}
            >
              {item}
            </div>
          ))
        }
      </div>
    )
  )
}

const SearchJump = () => {
  return (
    <div
      className='cursor-pointer rounded-full p-1.5 text-2xl hover:bg-neutral-500/20'
    >
      <Icon
        icon='heroicons-outline:search'
      />
    </div>
  )
}

export const Search = () => {

  const [suggestionResult, setSuggestionResult] = useState<Array<string>>([])

  return (
    <div
      className='relative flex w-[28vw] items-center gap-x-1 rounded-full px-3 py-2 dark:bg-neutral-800'
    >
      <SearchEngine />
      <SearchBar
        modifySuggestion={(data) => setSuggestionResult(data)}
      />
      <SearchJump />
      <SearchSuggestion
        data={suggestionResult || []}
      />
    </div>
  )
}