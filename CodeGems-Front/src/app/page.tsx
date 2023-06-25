'use client'
import usePlaylists from '@/hooks/Api/usePlaylists'
import PlaylistGrid from '@/components/PlaylistGrid/PlaylistGrid'

export default function Home() {
  const { playlists } = usePlaylists()
  return (
    <>
      <PlaylistGrid playlists={playlists} />
    </>
  )
}
