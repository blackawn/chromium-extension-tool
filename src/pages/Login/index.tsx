import { useEffect, useState } from 'react'


export default function Login() {

  const [selectIdx, setSelectIdx] = useState(1)

  useEffect(() => {

    function fn(this: Document, e: KeyboardEvent) {
      if (e.key === 'ArrowUp') {
        setSelectIdx((prev) => --prev)
      }
      if (e.key === 'ArrowDown') {
        setSelectIdx((prev) => ++prev)
      }
    }

    document.addEventListener('keydown', fn)

    return () => {
      document.removeEventListener('keydown', fn)
    }
  }, [])

  return (
    <div></div>
  )
}