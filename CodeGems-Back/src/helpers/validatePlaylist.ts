import { invalidDataError } from '@/errors/invalid-data-error'
import { google as gg } from 'googleapis'
export async function listUserPlaylists(oauthToken: string) {
  return gg
    .youtube('v3')
    .playlists.list({ oauth_token: oauthToken, part: ['snippet'], mine: true })
}

type youtubePlaylistData = {
  items: {
    kind: string
    etag: string
    id: string
    snippet: {
      title: string
      thumbnails: {
        high: {
          url: string
        }
        standard: {
          url: string
        }
        maxres: {
          url: string
        }
      }
    }
  }[]
}

export async function validatePlaylist(
  url: string,
): Promise<youtubePlaylistData> {
  const playlistIdRegex = /list=([A-Za-z0-9_-]+)/

  const match = url.match(playlistIdRegex)

  if (match) {
    const playlistId = match[1]
    return (
      await gg.youtube('v3').playlists.list({
        key: 'AIzaSyDTt6fEt42RJoOp3lP43fTiAs6coaPPnt4',
        part: ['snippet'],
        id: [playlistId],
      })
    ).data as unknown as youtubePlaylistData
  } else throw invalidDataError()
}
