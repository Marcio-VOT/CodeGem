import { prisma } from '@/config/prisma'
import { User } from '@prisma/client'

export async function getUserById(
  userId: number,
): Promise<Omit<User, 'createdAt' | 'updatedAt' | 'userType'>> {
  const { id, name, email, imageUrl } = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  })

  return { id, name, email, imageUrl }
}
