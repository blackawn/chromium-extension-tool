import { Icon } from '@iconify/react'
import { memo } from 'react'
import { SearchRedirectProps } from './types'

/**
 * SearchRedirect
 */
export const SearchRedirect = memo((props: SearchRedirectProps) => {

  const { onClick } = props

  console.log('SearchRedirect')

  return (
    <div
      className='cursor-pointer rounded-full p-1.5 text-2xl hover:bg-neutral-500/20'
      onClick={onClick}
    >
      <Icon
        icon='heroicons-outline:search'
      />
    </div>
  )
})

SearchRedirect.displayName = 'SearchRedirect'