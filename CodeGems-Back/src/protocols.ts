import { LeveLs, UserType } from '@prisma/client'

export type UserInfo = {
  id: string
  name: string
  email: string
  image: string
}

export type ApplicationError = {
  name: string
  message: string
}

export type UserData<T> = {
  user: T
  account: {
    provider: 'github' | 'google'
    access_token: string
  }
}

export type upsertUserProtocol = {
  token: string
  userType: UserType
  user: UserInfo
}

export type playlistFilterInputs = {
  userId?: number
  tags?: string[]
  level?: LeveLs
}

export type userData = {
  token: string
  email: string
  userType: UserType
}

export type playlistDeleteData = {
  playlistId: number
}

export type playlistCreateData = {
  link: string
  title: string
  thumbnail: string
  level: LeveLs
}

export type AuthenticatedRequest = Request & {
  userId: number
}
