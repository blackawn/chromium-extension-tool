import Header from './Header'
import Main from '@/layout/Main'
import texture from '@/assets/texture.png'
import { useEffect } from 'react'

export default function Shared() {

  const toggleTheme = (event: MouseEvent) => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      const root = document.documentElement
      root.classList.toggle('dark')
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
  }

  // useEffect(() => {
  //   document.documentElement.addEventListener('click', (e) => toggleTheme(e))

  //   return () => {
  //     document.documentElement.removeEventListener('click', (e) => toggleTheme(e))
  //   }

  // }, [])

  return (
    <div
      className='x h-screen w-screen overflow-hidden bg-neutral-100 dark:bg-neutral-900'
      style={{
        backgroundImage: `url(${texture})`
      }}
    >
      <div>
        <Header />
        <Main />
      </div>
    </div>
  )
}