// import authenticationService from '@/services/authentication-services'
import { AuthenticatedRequest, UserData, UserInfo } from '@/protocols'
import authenticationService from '@/services/authentication-services'
import { UserType } from '@prisma/client'
import { NextFunction, Response } from 'express'
import httpStatus from 'http-status'

export async function singInPost(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const {
    user,
    account: { provider: userType, access_token: token },
  } = req.body as UserData<UserInfo>

  try {
    console.log(user, 'aaa')
    console.log(token)
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
