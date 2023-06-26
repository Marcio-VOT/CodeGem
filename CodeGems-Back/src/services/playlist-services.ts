import { unauthorizedError } from '@/errors/unauthorized-error'
import { testToken } from '@/helpers/testToken'
import {
  playlistCreateData,
  playlistDeleteData,
  playlistFilterInputs,
  userData,
} from '@/protocols'
import authRepository from '@/repositories/authentication-repository'
import * as playlistRepositories from '@/repositories/playlist-repository'

export async function listPlaylists({
  level,
  tags,
  userId,
}: playlistFilterInputs) {
  return await playlistRepositories.listPlaylists({
    tags,
    level,
    userId: Number(userId) || undefined,
  })
}

export async function deletePlaylist({
  playlistId,
  token,
  userType,
  email,
}: playlistDeleteData & userData) {
  if (token === undefined || !token || !email) throw unauthorizedError()

  const tokenEmail = await testToken({ token, userType })

  if (email !== tokenEmail) throw unauthorizedError()

  const { User, id } = await playlistRepositories.getPlaylistById(playlistId)

  if (!User || User.email !== email || User.userType !== userType)
    throw unauthorizedError()

  await playlistRepositories.deletePlaylistById(id)
}

export async function createPlaylist({
  token,
  userType,
  email,
  level,
  link,
  thumbnail,
  title,
}: playlistCreateData & userData) {
  if (token === undefined || !token || !email) throw unauthorizedError()

  const tokenEmail = await testToken({ token, userType })

  if (email !== tokenEmail) throw unauthorizedError()

  const { id } = await authRepository.getUser({ email, userType })

  return await playlistRepositories.createPlaylist({
    userId: id,
    level,
    link,
    thumbnail,
    title,
  })
}
