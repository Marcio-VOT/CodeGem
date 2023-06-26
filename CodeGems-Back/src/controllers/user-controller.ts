import { NextFunction, Response } from 'express'
import httpStatus from 'http-status'
import * as userServices from '@/services/user-services'
import { AuthenticatedRequest } from '@/protocols'

export async function userDataFromId(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const { userId } = req.params as unknown as { userId: number }

  try {
    const userData = await userServices.userDataFromId(Number(userId))
    res.status(httpStatus.OK).send(userData)
  } catch (e) {
    next(e)
  }
}

export async function userDataFromSession(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const { userId } = req as { userId: number }

  try {
    const userData = await userServices.userDataFromId(Number(userId))
    res.status(httpStatus.OK).send(userData)
  } catch (e) {
    next(e)
  }
}
