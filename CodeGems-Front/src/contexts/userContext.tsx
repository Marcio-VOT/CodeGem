'use client'
import { useUserFromSession } from '@/hooks/Api/useUser'
import { UserFromApi } from '@/protocols'
import { Session } from 'next-auth'
// import { authConfig } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import { ReactNode, createContext } from 'react'

export const UserContext = createContext<{
  loginStatus: boolean
  session: Session | null
  userDataFromSession: {
    userData: UserFromApi
    userErro: Error | null
    loadingUser: boolean
  }
  status: 'authenticated' | 'loading' | 'unauthenticated'
  tags: string[]
}>({
  loginStatus: false,
  session: null,
  userDataFromSession: {
    userData: {
      id: 0,
      imageUrl: '',
      name: '',
      userTags: [],
    },
    userErro: null,
    loadingUser: true,
  },
  status: 'loading',
  tags: [],
})

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const loginStatus = !!session

  const tags: string[] = []

  // const {
  //   data,
  //   status,
  // }: { data: any; status: 'authenticated' | 'loading' | 'unauthenticated' } =
  //   useSession()

  const { accessToken }: { accessToken: string } = session
    ? (session as unknown as {
        accessToken: string
      })
    : { accessToken: '' }

  const userDataFromSession = useUserFromSession({
    token: session ? accessToken : '',
    email: session && session.user ? (session.user.email as string) : '',
  })

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        session,
        userDataFromSession,
        status,
        tags,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
