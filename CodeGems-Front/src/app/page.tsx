'use client'
import { PageRouter } from '@/components/PageRouter'
import usePlaylists from '@/hooks/Api/usePlaylists'
import { Playlist } from '@/protocols'
import { Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const { playlists } = usePlaylists({})
  const [page, setPage] = useState(1)
  return (
    <main className="flex h-[100%] flex-wrap-reverse justify-center overflow-y-auto py-10 xl:px-12">
      <div className="relative h-fit min-h-[57rem] w-full bg-search-800 pb-12 xl:rounded-3xl">
        <div className="grid h-full w-full grid-cols-1 gap-8 px-10 pb-6 pt-20 md:grid-cols-2  xl:grid-cols-4">
          {playlists &&
            playlists
              .slice((page - 1) * 12, page * 12)
              .map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
        </div>
        <PageRouter
          total={Math.ceil(playlists?.length / 12) || 0}
          page={page}
          setPage={setPage}
        />
      </div>
    </main>
  )
}

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <Link href={playlist.link}>
      <div className="relative flex h-auto w-full rounded-xl border-2 border-search-700 bg-search-700">
        <Image
          className="h-auto w-full rounded-xl"
          src={playlist.thumbnail}
          alt={playlist.title}
          height={1080}
          width={1920}
        />

        <div className="absolute bottom-0 z-30 flex h-10 w-full items-center justify-between rounded-b-xl bg-gray-800 px-4">
          <div className="flex w-11/12">
            <p className="flex w-2/6 truncate text-sm ">{playlist.title}</p>
            <div className="flex w-2/6 overflow-hidden">
              {playlist.PlayLstTags.map((e, i) => (
                <Chip key={`${playlist.id}${i}`} size="xs" className="mr-1">
                  {e.Tag.tag}
                </Chip>
              ))}{' '}
            </div>
          </div>
          <div className="relative h-8 min-w-[2rem]">
            <Image
              src={playlist.User.imageUrl}
              fill
              style={{ objectFit: 'contain' }}
              alt="User Icon"
              className="cursor-pointer rounded-full"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
