// import { faker } from '@faker-js/faker'
import { LeveLs, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tag: { tag: string }[] = [
  { tag: 'nodejs' },
  { tag: 'nextjs' },
  { tag: 'prisma' },
  { tag: 'aws' },
  { tag: 'mongodb' },
  { tag: 'scrum' },
  { tag: 'javascript' },
  { tag: 'typescript' },
  { tag: 'html' },
  { tag: 'css' },
  { tag: 'express' },
  { tag: 'jest' },
  { tag: 'react' },
]

const level: LeveLs[] = ['JUNIOR', 'PLENO', 'SENIOR']

const playlists = [
  {
    level: level[0],
    link: 'https://www.youtube.com/playlist?list=PLbx002IQAEWXMOPJ2-oKWEgskwMmJcXN6',
    thumbnail:
      'https://i.ytimg.com/vi/aQZDyyIyQMA/hqdefault.jpg?sqp=-oaymwExCNACELwBSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYLiBjKHIwDw==&rs=AOn4CLByjdlptW5Qwv22SowQcXLbOyVW5A',
    title: 'Turma 9 - Driven',
    userId: 1,
  },
  {
    level: level[1],
    link: 'https://www.youtube.com/playlist?list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH',
    thumbnail:
      'https://i.ytimg.com/vi/9P8mASSREYM/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCu4gyleoIe4GMgMXsA1Al-hwwh3g',
    title: 'Next.js Tutorial for Beginners',
    userId: 1,
  },
  {
    level: level[2],
    link: 'https://www.youtube.com/playlist?list=PLnDvRpP8BnezfJcfiClWskFOLODeqI_Ft',
    thumbnail:
      'https://i.ytimg.com/vi/XHrbg2iYNCg/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCdBVxZQfAJ-FLqt_Dd2-xLR3YWCA',
    title: 'Curso de Next.js',
    userId: 1,
  },
  {
    level: level[0],
    link: 'https://www.youtube.com/playlist?list=PLIGDNOJWiL1_ygbYCizW9ORMazELD9foK',
    thumbnail:
      'https://i.ytimg.com/vi/Mzu3u0CsEm4/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCFrs8ti83ftCcGCV9mek_XnFTzoA',
    title: 'Node JS with Prisma ORM',
    userId: 2,
  },
  {
    level: level[1],
    link: 'https://www.youtube.com/playlist?list=PLNxgiCRAlsf1u28PbdZ1ji4T2oJBujxjR',
    thumbnail:
      'https://i.ytimg.com/vi/5DIBAFfZGfo/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBNmGUDzavzNCK4M6ohWZnVApO6GA',
    title: 'Backend - Nestjs e Prisma - SCV',
    userId: 2,
  },
  {
    level: level[2],
    link: 'https://www.youtube.com/playlist?list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2',
    thumbnail:
      'https://i.ytimg.com/vi/39znK--Yo1o/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAVwg0nNalmbwf_Hf04rCn3QRlL0Q',
    title: 'ExpressJS 2022 Course',
    userId: 2,
  },
]
async function main() {
  // const user = await prisma.user.findFirst()
  await prisma.tag.deleteMany()
  await prisma.tag.createMany({
    data: tag,
  })
  const taglist = await prisma.tag.findMany({
    select: { id: true },
  })

  await prisma.playList.deleteMany()
  await prisma.playList.createMany({
    data: [
      ...playlists,
      ...playlists,
      ...playlists,
      ...playlists,
      ...playlists,
    ],
  })
  const playlistList = await prisma.playList.findMany()
  const data: { playlistId: number; tagId: number }[] = []

  playlistList.map((p) =>
    taglist.forEach((t) => {
      data.push({ playlistId: p.id, tagId: t.id })
    }),
  )
  await prisma.playLstTags.createMany({
    data,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
