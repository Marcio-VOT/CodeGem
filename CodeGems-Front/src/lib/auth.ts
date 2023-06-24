import axios from 'axios'
import { NextAuthOptions, Session } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authConfig: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            'openid email profile https://www.googleapis.com/auth/youtube.readonly',
        },
      },
    }),
  ],
  pages: {
    error: '/',
    signIn: '/',
    signOut: '/',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        await axios.post(`${process.env.BACKEND_URL}/login`, { user, account })
      } catch (error) {
        return '/'
      }
      return true
    },
    async session({
      session,
      user,
      token,
    }): Promise<Session & { accessToken: string }> {
      return { ...session, accessToken: token.accessToken as string }
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
}

// export async function loginIsRequiredServer() {
//   const session = await getServerSession(authConfig)
//   if (!session) return redirect('/')
// }

// export function loginIsRequiredClient() {
//   if (typeof window !== 'undefined') {
//     const session = useSession()
//     const router = useRouter()
//     if (!session) router.push('/')
//   }
// }
