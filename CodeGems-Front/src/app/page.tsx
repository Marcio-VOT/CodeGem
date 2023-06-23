'use client'
import { PageRouter } from '@/components/PageRouter'
import PlaylistCard from '@/components/PlaylistCard/PlaylistCard'
import usePlaylists from '@/hooks/Api/usePlaylists'
import { useState } from 'react'

export default function Home() {
  const { playlists } = usePlaylists()
  const [page, setPage] = useState(1)
  return (
    <main className="flex h-[100%] flex-wrap-reverse justify-center py-10 xl:px-12">
      <div className="relative h-auto min-h-[58rem] w-full border-2 border-t-0 border-white-400 border-opacity-75  bg-[url(../../public/layered-waves-haikei.svg)] bg-cover pb-12 drop-shadow-2xl  xl:rounded-3xl">
        <div className="grid h-fit w-full grid-cols-1 gap-3 px-10 pb-6 pt-20 md:grid-cols-2  xl:grid-cols-4">
          {playlists &&
            playlists.map(
              (playlist, i) =>
                i >= (page - 1) * 12 &&
                i < page * 12 && (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ),
            )}
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
