'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'
import { UserProvider } from '@/contexts/userContext'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider refetchInterval={3600} refetchOnWindowFocus>
      <UserProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </UserProvider>
    </SessionProvider>
  )
}
