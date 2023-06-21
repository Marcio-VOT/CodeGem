/*
  Warnings:

  - Added the required column `grade` to the `Grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `PlayList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlayList" DROP CONSTRAINT "PlayList_userId_fkey";

-- AlterTable
ALTER TABLE "Grades" ADD COLUMN     "grade" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PlayList" ADD COLUMN     "link" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
