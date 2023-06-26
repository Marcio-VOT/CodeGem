'use client'
import PlaylistGrid from '@/components/PlaylistGrid/PlaylistGrid'
import { UserCard } from '@/components/UserCard/UserCard'
import usePlaylists from '@/hooks/Api/usePlaylists'
import { useUserFromApi } from '@/hooks/Api/useUser'
import { LeveLs } from '@/protocols'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const userId = usePathname().slice(1) as unknown as number
  const router = useRouter()
  const { userData, userErro, loadingUser } = useUserFromApi(userId)
  const [level, setLevel] = useState<LeveLs | undefined>(undefined)
  const { playlists } = usePlaylists({
    userId,
    level,
  })
  useEffect(() => {
    if (userErro) router.push('/')
    /* eslint-disable-next-line */
  }, [userErro])
  return (
    <>
      <PlaylistGrid playlists={playlists} user setLevel={setLevel} />
      <UserCard user={userData} mock={loadingUser || !!userErro} />
    </>
  )
}
