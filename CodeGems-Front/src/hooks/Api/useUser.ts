import useAsync from '../useAsync'
import { useCallback } from 'react'
import { getUser } from '@/services/usersApi'
import { UserFromApi } from '@/protocols'

export default function useUserFromApi(userId: number): {
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
