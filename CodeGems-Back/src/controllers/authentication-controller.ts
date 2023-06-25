// import authenticationService from '@/services/authentication-services'
import { UserData, UserInfo } from '@/protocols'
import authenticationService from '@/services/authentication-services'
import { UserType } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function singInPost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    user,
    account: { provider: userType, access_token: token },
  } = req.body as UserData<UserInfo>

  try {
    console.log(user, token, userType)
    await authenticationService.upsertUser({
      token,
      userType: userType.toUpperCase() as UserType,
      user,
    })
    return res.sendStatus(httpStatus.OK)
  } catch (e) {
    next(e)
  }
}
