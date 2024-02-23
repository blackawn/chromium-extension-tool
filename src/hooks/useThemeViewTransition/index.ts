import { useCallback } from 'react'

export const useThemeViewTransition = () => {

  const startTransition = useCallback((event: React.MouseEvent, callback?: () => void) => {

    const x = event.clientX
    const y = event.clientY

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      callback?.()
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 1000,
          easing: 'ease-in',
          pseudoElement:
            '::view-transition-new(root)',
        }
      )
    })
  }, [])

  return {
    startTransition
  }
}