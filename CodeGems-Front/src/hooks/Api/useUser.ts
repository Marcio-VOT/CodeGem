import useAsync from '../useAsync'
import { useCallback } from 'react'
import { getUser, getUserFromSession } from '@/services/usersApi'
import { UserFromApi } from '@/protocols'

export function useUserFromApi(userId: number): {
  userData: UserFromApi
  userErro: Error | null
  loadingUser: boolean
} {
  const {
    data: userData,
    error: userErro,
    loading: loadingUser,
  } = useAsync(
    useCallback(() => getUser(userId), [userId]),
    true,
  )

  return { userData, userErro, loadingUser }
}

export function useUserFromSession({
  token,
  email,
  userType,
}: {
  token: string
  userType?: string
  email: string
}): {
  userData: UserFromApi
  userErro: Error | null
  loadingUser: boolean
} {
  const {
    data: userData,
    error: userErro,
    loading: loadingUser,
  } = useAsync(
    useCallback(
      () => getUserFromSession({ token, email, userType }),
      [token, email, userType],
    ),
    true,
  )

  return { userData, userErro, loadingUser }
}
