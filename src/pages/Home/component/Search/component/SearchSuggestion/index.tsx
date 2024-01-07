import { memo } from 'react'
import clsx from 'clsx'
import { SearchSuggestionProps } from './types'

export const SearchSuggestion = memo((props: SearchSuggestionProps) => {

  const { data, selected, onMouseEnter, onMouseLeave, onClick } = props

  console.log('SearchSuggestion')

  return (
    <div
      className={clsx([
        'absolute left-0 top-full w-full rounded-b-lg bg-neutral-50 dark:bg-neutral-800',
        (data?.length ? 'visible pb-2 opacity-100' : 'invisible opacity-0')
      ])}
    >
      <div
        className='flex max-h-96 flex-col overflow-x-hidden'
      >
        {
          data?.map((item, index) => (
            <div
              className={clsx([
                'flex cursor-pointer items-center justify-between px-4 py-1',
                { 'bg-neutral-200/80 dark:bg-neutral-500/20': (selected === index) }
              ])}
              key={item}
              onClick={(e) => onClick && onClick(e, item)}
              onMouseEnter={() => onMouseEnter && onMouseEnter(index)}
              onMouseLeave={onMouseLeave}
            >
              <span
                className='text-base'
              >
                {item}
              </span>
            </div>
          ))
        }
      </div>
    </div >
  )
})

SearchSuggestion.displayName = 'SearchSuggestion'