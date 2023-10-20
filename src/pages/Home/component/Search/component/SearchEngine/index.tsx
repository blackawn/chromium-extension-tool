import { memo, useMemo } from 'react'
import clsx from 'clsx'
import type { SearchEngineName, SearchEngineType } from '@/hooks/useRedirect/types'
import { storeSearchEngine } from '@/store/searchEngine'

import icon_baidu from '@/assets/baidu.svg'
import icon_bing from '@/assets/bing.svg'
import icon_google from '@/assets/google.svg'

export const SearchEngine = memo(() => {

  const searchEngineList = useMemo<SearchEngineType>(() => (
    {
      'baidu': {
        icon: icon_baidu
      },
      'bing': {
        icon: icon_bing
      },
      'google': {
        icon: icon_google
      }
    }
  ), [])

  const { searchEngine, modifySearchEngine } = storeSearchEngine()

  console.log('SearchEngine')

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
          src={searchEngineList[searchEngine].icon}
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
          {(Object.keys(searchEngineList) as SearchEngineName[]).map((item) => (
            <div
              className={clsx([
                'h-7 w-7 cursor-pointer duration-300',
                (searchEngine === item ? 'grayscale-0' : 'grayscale-[0.95]')
              ])}
              key={item}
              onClick={() => modifySearchEngine(item)}
            >
              <img
                alt=''
                className='h-full w-full object-cover'
                src={searchEngineList[item].icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

SearchEngine.displayName = 'SearchEngine'