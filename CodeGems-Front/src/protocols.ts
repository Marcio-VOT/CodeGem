import { Dispatch, SetStateAction } from 'react'

export type PageData = {
  total: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

export type LeveLs = 'JUNIOR' | 'SENIOR' | 'PLENO'

export type playlistFilterInputs = {
  userId?: number
  tags?: string[]
  level?: LeveLs
}

// export type Playlist = {
//   id: number
//   thumbnail: string
//   link: string
//   title: string
//   grade: number
//   level: LeveLs
//   userId: 1
//   PlayLstTags: string[]
// }
// type PlayLstTags = {
//   id: number
//   tagId: number
//   playlistId: number
// }
type Tag = {
  id: number
  tag: string
}

export type User = {
  id: number
  name: string
  email: string
  imageUrl: string
}
export type Playlist = {
  id: number
  thumbnail: string
  title: string
  link: string
  grade: number
  level: LeveLs
  userId: number | null
  User: User
  PlayLstTags: {
    Tag: Tag
  }[]
}
