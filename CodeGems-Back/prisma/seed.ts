// import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

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

// const level: LeveLs[] = ['JUNIOR', 'PLENO', 'SENIOR']

async function main() {
  // const user = await prisma.user.findFirst()
  await prisma.tag.deleteMany()
  await prisma.tag.createMany({
    data: tag,
  })

  await prisma.playList.deleteMany()
  // await prisma.playList.createMany({
  //   data: {},
  // })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
