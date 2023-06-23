import { ReactNode } from 'react'
import './globals.css'
import { Teko, Roboto_Flex as Roboto } from 'next/font/google'
import { Providers } from './providers'
import { NavBar } from '@/components/NavBar/NavBar'

const teko = Teko({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-teko',
})
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'CodeGem',
  description: 'Your learning platform for coding',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className=" dark">
      <body
        className={`${roboto.variable} ${teko.variable} h-fit max-h-fit min-h-screen bg-[url(../../public/layered-waves-haikei.svg)] bg-cover font-sans text-gray-200 `}
      >
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
