import { prisma } from '@/config/prisma'
import { playlistCreateData, playlistFilterInputs } from '@/protocols'
import { PlayList, Tag, User } from '@prisma/client'

export async function listPlaylists({
  tags,
  level,
  userId,
}: playlistFilterInputs): Promise<
  (PlayList & {
    PlayLstTags: {
      Tag: Tag
    }[]
    User: Omit<User, 'createdAt' | 'updatedAt' | 'userType'> | null
  })[]
> {
  return prisma.playList.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
        },
      },
      PlayLstTags: {
        select: {
          Tag: true,
        },
      },
    },
    where: {
      AND: [
        { userId },
        { level },
        {
          PlayLstTags:
            tags && tags.length > 0
              ? {
                  some: { Tag: { tag: { in: tags } } },
                }
              : undefined,
        },
      ],
    },
  })
}

export async function getPlaylistById(playlistId: number) {
  return prisma.playList.findUniqueOrThrow({
    include: {
      User: true,
    },
    where: { id: playlistId },
  })
}

export async function deletePlaylistById(playlistId: number) {
  await prisma.playList.delete({
    where: { id: playlistId },
  })
}

export async function createPlaylist({
  level,
  link,
  thumbnail,
  title,
  userId,
}: playlistCreateData & { userId: number; thumbnail: string; title: string }) {
  return prisma.playList.create({
    data: {
      grade: 0,
      level,
      link,
      thumbnail,
      title,
      userId,
    },
  })
}
