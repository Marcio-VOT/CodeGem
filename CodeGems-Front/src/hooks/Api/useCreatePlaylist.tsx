import useAsync from '../useAsync'
import * as playlistApi from '../../services/playlistApi'
import { useCallback } from 'react'
import { Playlist, playCreateInputs } from '@/protocols'

export default function useCreatePlaylist({
  link,
  tags,
  level,
  email,
  token,
}: playCreateInputs): {
  playlist: Playlist
  playlistsError: Error | null
  playlistLoading: boolean
  createPlaylist: (...args: any[]) => Promise<any>
} {
  const {
    data: playlist,
    error: playlistsError,
    loading: playlistLoading,
    act: createPlaylist,
  } = useAsync(
    useCallback(
      () => playlistApi.createPlaylist({ level, tags, link, email, token }),
      [token, email, link, level, tags],
    ),
    false,
  )

  return {
    playlist,
    playlistsError,
    playlistLoading,
    createPlaylist,
  }
}
