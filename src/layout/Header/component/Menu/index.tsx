import { useTheme } from '@/hooks/useTheme'
import { useThemeViewTransition } from '@/hooks/useThemeViewTransition'

type Theme = 'light' | 'dark' | 'system' | null

export const Menu = () => {

  const { theme, setTheme, modifyClass } = useTheme(false)

  const { startTransition } = useThemeViewTransition()

  const buttonClick = (e: React.MouseEvent<HTMLButtonElement>, value: Theme) => {

    setTheme((prev) => {

      if (prev !== value) {
        startTransition(e, () => {
          modifyClass()
        })
      }
      return value
    })

  }

  return (
    <div
      className='ml-auto'
    >
      <div
        className='flex space-x-2'
      >
        <div>
          {theme}
        </div>
        <button
          onClick={(e) => buttonClick(e, 'light')}
        >
          light
        </button>
        <button
          onClick={(e) => buttonClick(e, 'dark')}
        >
          dark
        </button>
        <button
          onClick={(e) => buttonClick(e, 'system')}
        >
          system
        </button>
      </div>
    </div>
  )
}