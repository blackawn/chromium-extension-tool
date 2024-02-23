import { memo } from 'react'
import { SearchInputProps } from './types'
import clsx from 'clsx'
import { Icon } from '@iconify/react'

export const SearchInput = memo((props: SearchInputProps) => {

  const {
    value,
    onClear,
    ...other
  } = props

  console.log('SearchInput')

  return (
    <div
      className='flex flex-1 items-center'
      tabIndex={0}
    >
      <div
        className='flex-1'
      >
        <input
          autoComplete=''
          autoFocus={true}
          className='size-full bg-transparent text-base tracking-wide outline-none'
          placeholder=''
          type='text'
          value={value}
          {...other}
        />

      </div>
      {/* Clear */}
      <div
        className={clsx([
          'flex size-8 cursor-pointer items-center justify-center rounded-full text-xl duration-300 hover:bg-neutral-200/80 dark:hover:bg-neutral-500/20',
          ((value?.toString().trim() !== '') ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0')
        ])}
        onClick={onClear}
      >
        <Icon
          icon='ic:round-close'
        />
      </div>
    </div >
  )
})

SearchInput.displayName = 'SearchEngine'