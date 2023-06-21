import { invalidProviderError } from '@/errors/invalid-provider-error'
import { UserType } from '@prisma/client'
import axios from 'axios'
import { google as gg } from 'googleapis'

export async function google(token: string): Promise<string> {
  const g = await new gg.auth.OAuth2().getTokenInfo(token)
  return g.email as string
}

export async function github(token: string): Promise<string> {
  const {
    data: [{ email }],
  } = await axios.get('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return email
}

export async function testToken({
  token,
  userType,
}: {
  token: string
  userType: UserType
}): Promise<string> {
  if (userType === UserType.GITHUB) {
    return await github(token)
  } else if (userType === UserType.GOOGLE) {
    return await google(token)
  } else throw invalidProviderError()
}
