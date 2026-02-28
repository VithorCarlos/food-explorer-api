/*
  Warnings:

  - You are about to drop the column `is_main` on the `user_attachments` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `user_attachments` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "unique_main_image_per_product";

-- AlterTable
ALTER TABLE "user_attachments" DROP COLUMN "is_main",
DROP COLUMN "position";
