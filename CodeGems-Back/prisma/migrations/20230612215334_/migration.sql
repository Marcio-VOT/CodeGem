/*
  Warnings:

  - You are about to drop the `_PlayListToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlayListToTag" DROP CONSTRAINT "_PlayListToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayListToTag" DROP CONSTRAINT "_PlayListToTag_B_fkey";

-- AlterTable
ALTER TABLE "PlayList" ADD COLUMN     "tagId" INTEGER;

-- DropTable
DROP TABLE "_PlayListToTag";

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
