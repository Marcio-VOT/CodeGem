/*
  Warnings:

  - Made the column `userId` on table `PlayList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PlayList" ALTER COLUMN "grade" SET DEFAULT 0,
ALTER COLUMN "userId" SET NOT NULL;
