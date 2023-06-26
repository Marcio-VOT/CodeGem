import {
  playlistCreateData,
  playlistDeleteData,
  playlistFilterInputs,
  userData,
} from '@/protocols'
import { LeveLs, UserType } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import * as playlistServices from '@/services/playlist-services'

export async function listPlaylists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const searchData = req.query as playlistFilterInputs
  try {
    const result = await playlistServices.listPlaylists(searchData)
    return res.status(httpStatus.OK).send(result)
  } catch (e) {
    next(e)
  }
}

export async function deletePlaylist(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteInfo = req.body as playlistDeleteData & userData
  try {
    await playlistServices.deletePlaylist({
      ...deleteInfo,
      userType: deleteInfo.userType.toUpperCase() as UserType,
    })
    return res.sendStatus(httpStatus.OK)
  } catch (e) {
    next(e)
  }
}

export async function createPlaylist(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createInfo = req.body as playlistCreateData & userData
  try {
    const result = await playlistServices.createPlaylist({
      ...createInfo,
      userType: createInfo.userType.toUpperCase() as UserType,
      level: createInfo.level.toUpperCase() as LeveLs,
    })
    return res.status(httpStatus.CREATED).send(result)
  } catch (e) {
    next(e)
  }
}
