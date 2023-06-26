import { Playlist } from '@/protocols'
import { Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <Link href={playlist.link}>
      <div className="relative flex h-auto w-full border-y-2 border-white-100 border-opacity-20 bg-inherit pe-16 drop-shadow-sm hover:drop-shadow-lg md:rounded-xl md:border-x-2 ">
        <Image
          className="h-auto w-full md:rounded-s-xl"
          src={playlist.thumbnail}
          alt={playlist.title}
          height={1080}
          width={1920}
        />
        <Link href={`/${playlist.userId}`}>
          <div className="absolute bottom-0 left-0 w-2/3 rounded-se-3xl bg-gray-800  bg-opacity-90 md:rounded-es-xl">
            <p className="ml-3 block w-2/3 truncate text-lg text-white-100 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              {playlist.title}
            </p>
          </div>
          <div className="absolute bottom-0 right-0 z-30 h-full w-20 flex-col overflow-hidden bg-gray-800 p-1 md:rounded-e-xl">
            <div className="relative ml-1 mt-2 min-h-[2rem] w-8">
              <Image
                src={playlist.User.imageUrl}
                fill
                style={{ objectFit: 'contain' }}
                alt="User Icon"
                className=" cursor-pointer rounded-full "
              />
            </div>
            <p className="ms-1 mt-1 block truncate text-xs">
              {playlist.User.name}
            </p>
            <div className="no-scrollbar mt-1 flex h-full w-full overflow-y-auto">
              <div className="no-scrollbar h-full flex-col overflow-x-hidden pb-20">
                {playlist.PlayLstTags.map((e, i) => (
                  <Chip
                    variant="flat"
                    key={`${playlist.id}${i}`}
                    size="xs"
                    className="mr-0.5"
                  >
                    {e.Tag.tag}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Link>
  )
}
