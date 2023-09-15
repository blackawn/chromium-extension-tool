import { useState, useEffect, useCallback, useRef } from 'react'

export const useMouseLongPress = (callback: () => void, time = 500) => {
  const [startLongPress, setStartLongPress] = useState(false)

  const handleMouseDown = useCallback(() => {
    setStartLongPress(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setStartLongPress(false)
  }, [])

  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {

    if (startLongPress) {
      timer.current = setTimeout(callback, time)
    } else {
      clearTimeout(timer.current)
    }

    return () => {
      clearTimeout(timer.current)
    }
  }, [callback, time, startLongPress])

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onTouchStart: handleMouseDown,
    onTouchEnd: handleMouseUp,
  }
}
