import {
  createPlaylist,
  deletePlaylist,
  listPlaylists,
} from '@/controllers/playlist-controller'
import { authenticateToken } from '@/middlewares/authentication-middleware'
import { validateQuery } from '@/middlewares/validation-middleware'
import { searchPlaylistSchema } from '@/schemas/playlist-schemas'
import { Router } from 'express'

const playlistRouter = Router()

playlistRouter
  .get('', validateQuery(searchPlaylistSchema), listPlaylists)
  .all('*', authenticateToken)
  .post('', createPlaylist)
  .delete('', deletePlaylist)

export default playlistRouter
