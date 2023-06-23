import useAsync from '../useAsync'
import * as playlist from '../../services/playlistApi'
import { useCallback } from 'react'
import { Playlist, playlistFilterInputs } from '@/protocols'

export default function usePlaylists({
  level,
  tags,
  userId,
}: playlistFilterInputs = {}): {
  playlists: Playlist[]
  playlistsError: Error | null
  playlistLoading: boolean
} {
  const {
    data: playlists,
    error: playlistsError,
    loading: playlistLoading,
  } = useAsync(
    useCallback(
      () => playlist.getPlaylists({ level, tags, userId }),
      [level, tags, userId],
    ),
    true,
  )

  return {
    playlists,
    playlistsError,
    playlistLoading,
  }
}
