/*
  Warnings:

  - You are about to drop the column `attachmentId` on the `snacks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[snackId]` on the table `attachments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `snackId` to the `attachments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "snacks" DROP CONSTRAINT "snacks_attachmentId_fkey";

-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "snackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "snacks" DROP COLUMN "attachmentId";

-- CreateIndex
CREATE UNIQUE INDEX "attachments_snackId_key" ON "attachments"("snackId");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_snackId_fkey" FOREIGN KEY ("snackId") REFERENCES "snacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
