/*
  Warnings:

  - A unique constraint covering the columns `[attachment_id,resource_id]` on the table `attachment_link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "attachment_link" ALTER COLUMN "linked_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "idx_resource" ON "attachment_link"("resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "attachment_link_attachment_id_resource_id_key" ON "attachment_link"("attachment_id", "resource_id");
