'use client'
import { Session } from 'next-auth'
// import { authConfig } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import { ReactNode, createContext } from 'react'

export const UserContext = createContext<{
  loginStatus: boolean
  session: Session | null
}>({
  loginStatus: false,
  session: null,
})

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const loginStatus = !!session

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        session,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
