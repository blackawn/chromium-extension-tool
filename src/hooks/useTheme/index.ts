import { useState, useEffect, useLayoutEffect, useRef } from 'react'

type Theme = 'light' | 'dark' | 'system' | null

const modifyClass = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const useTheme = (auto = true) => {

  const [theme, setTheme] = useState<Theme>(null)

  const initial = useRef(true)

  const modifyTheme = () => {

    const theme = localStorage.theme

    if (theme === 'light' || theme === 'dark') {
      setTheme(theme)
    } else {
      setTheme('system')
    }
  }

  useLayoutEffect(() => {

    if (theme === 'system') {
      localStorage.removeItem('theme')
    } else if (theme === 'light' || theme === 'dark') {
      localStorage.theme = theme
    }

    if (initial.current) {
      initial.current = false
      modifyClass()
    } else if (auto) {
      modifyClass()
    }

  }, [theme])

  useEffect(() => {

    modifyTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQuery.addEventListener('change', modifyClass)

    window.addEventListener('storage', modifyTheme)

    return () => {

      mediaQuery.removeEventListener('change', modifyClass)

      window.removeEventListener('storage', modifyTheme)
    }
  }, [])

  return {
    theme,
    setTheme,
    modifyClass
  }
}