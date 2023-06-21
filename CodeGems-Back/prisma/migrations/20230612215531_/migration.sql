/*
  Warnings:

  - You are about to drop the column `tagId` on the `PlayList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayList" DROP CONSTRAINT "PlayList_tagId_fkey";

-- AlterTable
ALTER TABLE "PlayList" DROP COLUMN "tagId";
