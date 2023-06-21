// import { exchangeCodeForAccessToken } from '@/helpers/exchangeGithubCode'
import { unauthorizedError } from '@/errors/unauthorized-error'
import { testToken } from '@/helpers/testToken'
import { upsertUserProtocol } from '@/protocols'
import authRepository from '@/repositories/authentication-repository'
import { UserType } from '@prisma/client'

async function upsertUser({
  token,
  userType,
  user,
}: upsertUserProtocol): Promise<void> {
  if (token === undefined || !token || !user.email) throw unauthorizedError()

  const email = await testToken({ token, userType })

  if (user.email !== email) throw unauthorizedError()

  await authRepository.upsertUser(user, UserType[userType])
}

const authenticationService = {
  upsertUser,
}

export default authenticationService
