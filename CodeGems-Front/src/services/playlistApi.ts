import { playCreateInputs, playlistFilterInputs } from '@/protocols'
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

export async function createPlaylist({
  level,
  tags,
  link,
  email,
  token,
}: playCreateInputs) {
  return (await api.post('/playlist', { level, tags, link, email, token })).data
}
