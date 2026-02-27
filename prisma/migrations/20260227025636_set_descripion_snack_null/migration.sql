/*
  Warnings:

  - A unique constraint covering the columns `[attachment_id,resource_id,resource_type]` on the table `attachment_link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "attachment_link_attachment_id_resource_id_key";

-- DropIndex
DROP INDEX "idx_resource";

-- AlterTable
ALTER TABLE "snacks" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "idx_resource" ON "attachment_link"("resource_id", "resource_type");

-- CreateIndex
CREATE UNIQUE INDEX "attachment_link_attachment_id_resource_id_resource_type_key" ON "attachment_link"("attachment_id", "resource_id", "resource_type");
