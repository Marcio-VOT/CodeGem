'use client'

import PlaylistGrid from '@/components/PlaylistGrid/PlaylistGrid'
import usePlaylists from '@/hooks/Api/usePlaylists'
import { useUserFromApi } from '@/hooks/Api/useUser'
import { LeveLs, UserFromApi } from '@/protocols'
import { Card, CardHeader, Chip, Divider, Skeleton } from '@nextui-org/react'
import Image from 'next/image'
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

export function UserCard({
  user,
  mock,
}: {
  user: UserFromApi
  mock?: boolean
}) {
  return (
    <>
      <Card
        className="mb-8 mt-8 h-fit w-full rounded-none border-none xl:sticky xl:top-6 xl:ms-8 xl:min-h-[20rem] xl:w-3/12 xl:rounded-3xl"
        isBlurred
        shadow="lg"
      >
        <CardHeader className="flex w-full flex-wrap gap-3 p-6">
          {!mock ? (
            <Image
              alt={user.name}
              height={80}
              src={user.imageUrl}
              width={80}
              className="rounded-full"
            />
          ) : (
            <Skeleton className="h-20 w-20 rounded-full bg-white-100" />
          )}
          {!mock ? (
            <p className="text-3xl">{user.name}</p>
          ) : (
            <Skeleton className="h-6 w-3/6 rounded-full" />
          )}
        </CardHeader>
        <Divider className="h-[2px]" />
        {!mock ? (
          <div className="flex w-full flex-wrap py-4 ps-4">
            <p className="w-full text-3xl">Tags</p>
            {user.userTags.map((tag, i) => (
              <Chip variant="dot" className="ms-1 mt-2" size="lg" key={tag + i}>
                {tag}
              </Chip>
            ))}
          </div>
        ) : (
          <div></div>
        )}
        {/* <Divider className="h-[2px]" /> */}
      </Card>
    </>
  )
}
