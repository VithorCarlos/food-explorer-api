/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `snacks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "snacks" DROP COLUMN "imageUrl",
ADD COLUMN     "attachmentId" TEXT;

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "attachments_id_key" ON "attachments"("id");

-- AddForeignKey
ALTER TABLE "snacks" ADD CONSTRAINT "snacks_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
