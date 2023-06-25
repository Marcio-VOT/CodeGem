import { Playlist } from '@/protocols'
import { PageRouter } from '../PageRouter'
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import { useState } from 'react'
import { Skeleton } from '@nextui-org/react'

export default function PlaylistGrid(
  {
    playlists,
    user,
  }: {
    playlists: Playlist[]
    user?: boolean
  } = { playlists: [], user: false },
) {
  const [page, setPage] = useState(1)

  return (
    <>
      <div className="relative h-full min-h-[50.3rem] w-full border-y-4 border-white-100 border-opacity-5 pb-12 drop-shadow-lg backdrop-blur-sm xl:rounded-3xl xl:border-4">
        <div
          className={`grid h-fit w-full grid-cols-1 gap-3 px-10 pb-6 pt-20 md:grid-cols-2 ${
            user ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
          }`}
        >
          {playlists && playlists[0]
            ? playlists.map(
                (playlist, i) =>
                  i >= (page - 1) * 12 &&
                  i < page * 12 && (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ),
              )
            : Array(12)
                .fill(0)
                .map((a, i) => <MockCard key={i} />)}
        </div>
        <PageRouter
          total={Math.ceil(playlists?.length / 12) || 1}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  )
}

function MockCard() {
  return (
    <>
      <div className="relative h-52 w-full rounded-xl border-2 border-white-100 border-opacity-20 bg-search-700 bg-opacity-95 pe-16 drop-shadow-sm hover:drop-shadow-lg">
        <Skeleton className="absolute bottom-0 right-0 h-full w-16 rounded-e-xl" />
        <Skeleton className="absolute bottom-4 left-2 h-6 w-3/5 rounded-full bg-transparent" />
      </div>
    </>
  )
}
