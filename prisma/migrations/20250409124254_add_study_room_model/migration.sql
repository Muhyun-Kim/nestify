/*
  Warnings:

  - You are about to drop the `Study` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Study";

-- CreateTable
CREATE TABLE "StudyRoom" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "password" TEXT,
    "ownerId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyRoom_pkey" PRIMARY KEY ("id")
);
