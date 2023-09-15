import { useState } from 'react'

type SetValueCallback<T> = (newValue: T | (() => T), callback?: (value: T) => void) => Promise<T>

/**
 * callback or then
 * @param initialValue 
 * @returns 
 */
export const useStateCallback = <T>(initialValue: T | (() => T)): [T, SetValueCallback<T>] => {

  const [value, setValue] = useState<T>(initialValue)

  const setValueCallback: SetValueCallback<T> = async (newValue, callback) => {

    const result = await new Promise<T>((resolve) => {

      const updatedValue = typeof newValue === 'function' ? (newValue as () => T)() : newValue

      setValue(() => {
        resolve(updatedValue)
        return updatedValue
      })

    })

    callback && callback(result)

    return result
  }

  return [value, setValueCallback]
}