import { prisma } from '@/config/prisma'
import { UserInfo } from '@/protocols'
import { User, UserType } from '@prisma/client'

async function upsertUser(user: UserInfo, userType: UserType): Promise<User> {
  return prisma.user.upsert({
    where: { email_userType: { email: user.email, userType } },
    update: {
      email: user?.email,
      name: user.name,
      imageUrl: user.image,
      updatedAt: new Date(),
    },
    create: {
      email: user.email,
      name: user.name,
      imageUrl: user.image,
      userType,
      updatedAt: new Date(),
    },
  })
}

async function getUser({
  email,
  userType,
}: {
  email: string
  userType: UserType
}) {
  return prisma.user.findUniqueOrThrow({
    where: { email_userType: { email, userType } },
  })
}

const authRepository = {
  upsertUser,
  getUser,
}

export default authRepository
