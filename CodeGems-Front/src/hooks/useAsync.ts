import { useState, useEffect, useCallback } from 'react'

export default function useAsync<T>(
  handler: (...args: any[]) => Promise<T>,
  immediate = true,
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(immediate)
  const [error, setError] = useState<Error | null>(null)

  const act = useCallback(
    async (...args: any[]) => {
      setLoading(true)
      setError(null)

      try {
        const data = await handler(...args)
        setData(data)
        setLoading(false)
        return data
      } catch (err: any) {
        setError(err)
        setLoading(false)
      }
    },
    [handler],
  )

  useEffect(() => {
    if (immediate) {
      act()
    }
  }, [immediate, act])

  return {
    data,
    loading,
    error,
    act,
  }
}
