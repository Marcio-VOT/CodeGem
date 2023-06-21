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
) {
  const { token, userType } = req.body as unknown as {
    token?: string
    userType?: string
  }

  if (!token || !userType) return generateUnauthorizedResponse(res)

  try {
    await testToken({ token, userType: userType.toUpperCase() as UserType })
    const user = await prisma.user.findFirst()

    if (!user) return generateUnauthorizedResponse(res)

    req.userId = user.id
    return next()
  } catch (error) {
    return generateUnauthorizedResponse(res)
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError())
}
