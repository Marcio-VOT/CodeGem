-- CreateEnum
CREATE TYPE "LeveLs" AS ENUM ('JUNIOR', 'PLENO', 'SENIOR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "imageUrl" TEXT,
    "googleToken" TEXT,
    "githubToken" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayList" (
    "id" SERIAL NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "level" "LeveLs" NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "PlayList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grades" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "playlistId" INTEGER NOT NULL,

    CONSTRAINT "Grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayLstTags" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "playlistId" INTEGER NOT NULL,

    CONSTRAINT "PlayLstTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" VARCHAR(50) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayListToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleToken_key" ON "User"("googleToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubToken_key" ON "User"("githubToken");

-- CreateIndex
CREATE INDEX "PlayList_id_grade_idx" ON "PlayList"("id", "grade");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tag_key" ON "Tag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayListToTag_AB_unique" ON "_PlayListToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayListToTag_B_index" ON "_PlayListToTag"("B");

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayLstTags" ADD CONSTRAINT "PlayLstTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayLstTags" ADD CONSTRAINT "PlayLstTags_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayListToTag" ADD CONSTRAINT "_PlayListToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayListToTag" ADD CONSTRAINT "_PlayListToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
