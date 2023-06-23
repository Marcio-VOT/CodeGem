import { invalidDataError } from '@/errors/invalid-data-error'
import { google as gg } from 'googleapis'
export async function listUserPlaylists(oauthToken: string) {
  return gg
    .youtube('v3')
    .playlists.list({ oauth_token: oauthToken, part: ['snippet'], mine: true })
}

export async function validatePlaylist(url: string) {
  const playlistIdRegex = /list=([A-Za-z0-9_-]+)/
  const match = url.match(playlistIdRegex)
  if (match) {
    const playlistId = match[1]
    return await gg.youtube('v3').playlistItems.list({
      part: ['snippet'],
      playlistId,
      key: 'AIzaSyDTt6fEt42RJoOp3lP43fTiAs6coaPPnt4',
    })
  } else throw invalidDataError()
}
