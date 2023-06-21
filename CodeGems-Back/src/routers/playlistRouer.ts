import {
  createPlaylist,
  deletePlaylist,
  listPlaylists,
} from '@/controllers/playlist-controller'
import { validateBody } from '@/middlewares/validation-middleware'
import { searchPlaylistSchema } from '@/schemas/playlist-schemas'
import { Router } from 'express'

const playlistRouter = Router()

playlistRouter
  .get('', validateBody(searchPlaylistSchema), listPlaylists)
  .post('', createPlaylist)
  .delete('', deletePlaylist)

export default playlistRouter
