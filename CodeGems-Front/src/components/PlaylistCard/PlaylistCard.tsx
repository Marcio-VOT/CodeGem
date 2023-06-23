import { Playlist } from '@/protocols'
import { Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <Link href={playlist.link}>
      <div className="relative flex h-auto w-full rounded-xl bg-inherit pe-16 drop-shadow-sm hover:drop-shadow-lg  ">
        <Image
          className="h-auto w-full rounded-s-xl"
          src={playlist.thumbnail}
          alt={playlist.title}
          height={1080}
          width={1920}
        />
        <Link href={'/'}>
          <div className="absolute bottom-2 left-4 w-full">
            <p className="block w-1/3 truncate text-lg ">{playlist.title}</p>
          </div>
          <div className="no-scrollbar absolute bottom-0 right-0 z-30 h-full w-20 flex-col justify-self-end overflow-hidden overflow-y-auto rounded-e-xl bg-gray-800 p-1">
            <div className="relative ml-1 min-h-[2rem] w-8">
              <Image
                src={playlist.User.imageUrl}
                fill
                style={{ objectFit: 'contain' }}
                alt="User Icon"
                className=" cursor-pointer rounded-full "
              />
            </div>
            <div className="flex w-full">
              <div className="flex-col overflow-x-hidden">
                <p className="block truncate text-xs">{playlist.User.name}</p>
                {playlist.PlayLstTags.map((e, i) => (
                  <Chip key={`${playlist.id}${i}`} size="xs" className="mr-1">
                    {e.Tag.tag}
                  </Chip>
                ))}{' '}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Link>
  )
}
