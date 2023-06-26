import { playlistFilterInputs } from '@/protocols'
import api from './api'

export async function getPlaylists({
  level,
  tags,
  userId,
}: playlistFilterInputs) {
  return (
    await api.get('/playlist', {
      params: { level, tags, userId },
    })
  ).data
}
