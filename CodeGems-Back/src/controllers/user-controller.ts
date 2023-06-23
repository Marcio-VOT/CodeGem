import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import * as userServices from '@/services/user-services'

export async function userDataFromId(
  req: Request,
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
