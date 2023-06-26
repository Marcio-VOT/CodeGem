'use client'
import usePlaylists from '@/hooks/Api/usePlaylists'
import PlaylistGrid from '@/components/PlaylistGrid/PlaylistGrid'
import { useState } from 'react'
import { LeveLs } from '@/protocols'

export default function Home() {
  const [level, setLevel] = useState<LeveLs | undefined>(undefined)
  const { playlists } = usePlaylists({ level })
  console.log(level)
  return (
    <>
      <PlaylistGrid playlists={playlists} setLevel={setLevel} />
    </>
  )
}
