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

const SearchEngine = () => {

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
        className='h-10 w-10 cursor-pointer rounded-full p-1.5 hover:bg-neutral-500/20'
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

  const [value, setValue] = useState('')

  const [keyword, setKeyword] = useState('')

  const { searchEngine } = useSearchEngineStore()

  const { suggestionResult } = useJSONP(searchEngine, keyword)

  const timer = useRef<ReturnType<typeof setTimeout>>()

  const [selectIndex, setSelectIndex] = useState(-1)

  useEffect(() => {
    if (value.trim() === '') {
      setKeyword('')
    }
  }, [value])

  const onChange = (value: string) => {

    setValue(value)

    clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      setKeyword(value)
    }, 500)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (suggestionResult.length <= 0) return

    if (event.code === 'ArrowDown' && event.key === 'ArrowDown') {
      setSelectIndex((prev) => {
        const p = (prev >= (suggestionResult.length - 1)) ? 0 : ++prev

        setValue(suggestionResult[p])

        return p
      })
    } else if (event.code === 'ArrowUp' && event.key === 'ArrowUp') {

      event.preventDefault()

      setSelectIndex((prev) => {
        const p = (prev <= 0) ? (suggestionResult.length - 1) : --prev

        setValue(suggestionResult[p])

        return p
      })
    }
  }

  return (
    <div
      className={clsx([
        'relative flex w-96 items-center gap-x-1 px-2 py-1.5 dark:bg-neutral-800',
        (((suggestionResult.length) > 0) ? 'rounded-t-lg' : 'rounded-lg')
      ])}
      tabIndex={0}
    >
      <SearchEngine />
      {/* Input */}
      <div
        className='flex-1'
      >
        <input
          autoComplete=''
          className='h-full w-full bg-transparent text-base tracking-wide outline-none'
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setKeyword(value)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder=''
          type='text'
          value={value}
        />

      </div>
      {/* Clear */}
      <div
        className={clsx([
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xl duration-300 hover:bg-neutral-500/20',
          ((value.length > 0) ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0')
        ])}
        onClick={() => setValue('')}
      >
        <Icon
          icon='ic:round-close'
        />
      </div>
      {/* Search */}
      <SearchJump />
      {/* Suggestion */}
      <div
        className={clsx([
          'absolute left-0 top-full w-full rounded-b-lg bg-neutral-800 pb-2',
          ((suggestionResult.length > 0) ? 'visible opacity-100 ' : 'invisible opacity-0')
        ])}
      >
        <div
          className='flex max-h-96 flex-col overflow-x-hidden'
        >
          {
            suggestionResult?.map((item, index) => (
              <div
                className={clsx([
                  'flex cursor-pointer items-center justify-between px-4 py-1',
                  { 'bg-neutral-500/20': (selectIndex === index) }
                ])}
                key={item}
                onMouseEnter={() => setSelectIndex(index)}
                onMouseLeave={() => setSelectIndex(-1)}
              >
                <span>
                  {item}
                </span>
                <div
                  className={clsx([
                    'rounded-full p-1 text-xl hover:bg-neutral-500/60',
                    ((selectIndex === index) ? 'visible' : 'invisible scale-0 opacity-0')
                  ])}
                  onClick={() => setValue(item)}
                >
                  <Icon
                    icon='iconamoon:arrow-top-left-1'
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}