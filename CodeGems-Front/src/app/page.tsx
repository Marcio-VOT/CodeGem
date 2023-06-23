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
      <div className="relative h-auto min-h-[50.3rem] w-full border-y-4 border-white-100 border-opacity-5 pb-12 drop-shadow-lg backdrop-blur-sm xl:rounded-3xl xl:border-4">
        <div className="grid h-fit w-full grid-cols-1 gap-3 px-10 pb-6 pt-20 md:grid-cols-2 xl:grid-cols-4">
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
