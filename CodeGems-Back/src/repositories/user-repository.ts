import { prisma } from '@/config/prisma'
import { User } from '@prisma/client'

export async function getUserById(userId: number): Promise<
  Omit<User, 'createdAt' | 'updatedAt' | 'userType' | 'email'> & {
    userTags: string[]
  }
> {
  const {
    id,
    name,
    imageUrl,
    PlayList: playlistData,
  } = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: {
      PlayList: {
        select: {
          PlayLstTags: {
            select: {
              Tag: {
                select: {
                  tag: true,
                },
              },
            },
          },
        },
      },
    },
  })
  const tags = new Set()

  playlistData.map((playlist) =>
    playlist.PlayLstTags.map(({ Tag: { tag } }) => tags.add(tag)),
  )

  return { id, name, imageUrl, userTags: [...tags] as string[] }
}
