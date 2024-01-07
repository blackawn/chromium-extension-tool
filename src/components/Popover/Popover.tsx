import { memo } from 'react'
import { PopoverProps } from './types'

export const Popover: React.FC<PopoverProps> = memo((props) => {

  return (
    <div
      {...props}
    >
      
    </div>
  )
})

Popover.displayName = 'Popover'