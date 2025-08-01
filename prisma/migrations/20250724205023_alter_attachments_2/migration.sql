/*
  Warnings:

  - You are about to drop the column `snackId` on the `attachments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attachmentId]` on the table `snacks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_snackId_fkey";

-- DropIndex
DROP INDEX "attachments_snackId_key";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "snackId";

-- AlterTable
ALTER TABLE "snacks" ADD COLUMN     "attachmentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "snacks_attachmentId_key" ON "snacks"("attachmentId");

-- AddForeignKey
ALTER TABLE "snacks" ADD CONSTRAINT "snacks_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
