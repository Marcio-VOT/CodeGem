/*
  Warnings:

  - You are about to drop the column `githubToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleToken` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,userType]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('GOOGLE', 'GITHUB');

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_githubToken_key";

-- DropIndex
DROP INDEX "User_googleToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubToken",
DROP COLUMN "googleToken",
ADD COLUMN     "userType" "UserType" NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_userType_key" ON "User"("email", "userType");
