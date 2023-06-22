import { Playlist } from '@/protocols'
import { Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <Link href={playlist.link}>
      <div className="relative flex h-auto w-full rounded-xl border-2 border-search-700 bg-search-700 shadow-2xl">
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
