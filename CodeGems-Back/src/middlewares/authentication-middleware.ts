import { prisma } from '@/config/prisma'
import { unauthorizedError } from '@/errors/unauthorized-error'
import { testToken } from '@/helpers/testToken'
import { AuthenticatedRequest } from '@/protocols'
import { UserType } from '@prisma/client'
import { NextFunction, Response } from 'express'
import httpStatus from 'http-status'

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>> | undefined> {
  const {
    token,
    userType,
    email: frontEmail,
  } = req.body as unknown as {
    token?: string
    userType?: string
    email?: string
  }

  if (!token || !userType || !frontEmail)
    return generateUnauthorizedResponse(res)

  try {
    const email = await testToken({
      token,
      userType: userType.toUpperCase() as UserType,
    })
    if (email !== frontEmail) return generateUnauthorizedResponse(res)

    const user = await prisma.user.findUnique({
      where: {
        email_userType: { email, userType: userType.toUpperCase() as UserType },
      },
    })

    if (!user) return generateUnauthorizedResponse(res)

    req.userId = user.id
    next()
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError())
  }
}

function generateUnauthorizedResponse(res: Response) {
  return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError())
}
