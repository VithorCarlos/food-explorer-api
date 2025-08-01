/*
  Warnings:

  - You are about to drop the column `attachmentId` on the `snacks` table. All the data in the column will be lost.
  - You are about to drop the `attachments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RESOURSE_TYPE" AS ENUM ('USER', 'SNACK');

-- DropForeignKey
ALTER TABLE "snacks" DROP CONSTRAINT "snacks_attachmentId_fkey";

-- DropIndex
DROP INDEX "snacks_attachmentId_key";

-- AlterTable
ALTER TABLE "snacks" DROP COLUMN "attachmentId";

-- DropTable
DROP TABLE "attachments";

-- CreateTable
CREATE TABLE "attachment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "attachment_link" (
    "id" TEXT NOT NULL,
    "attachmentId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "resourceType" "RESOURSE_TYPE" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "attachment_id_key" ON "attachment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "attachment_link_id_key" ON "attachment_link"("id");

-- AddForeignKey
ALTER TABLE "attachment_link" ADD CONSTRAINT "attachment_link_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
