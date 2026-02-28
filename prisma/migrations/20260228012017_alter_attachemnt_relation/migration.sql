/*
  Warnings:

  - You are about to drop the column `deletionRequestedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hardDeleteScheduledAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attachment_link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attachment_link" DROP CONSTRAINT "attachment_link_attachment_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deletionRequestedAt",
DROP COLUMN "hardDeleteScheduledAt",
ADD COLUMN     "deletion_requested_at" TIMESTAMP(3),
ADD COLUMN     "hard_delete_scheduled_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "attachment";

-- DropTable
DROP TABLE "attachment_link";

-- DropEnum
DROP TYPE "ATTACHMENT_STATUS";

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_attachments" (
    "id" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "attachment_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_attachments" (
    "id" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "attachment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_attachments_attachment_id_product_id_key" ON "product_attachments"("attachment_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_attachments_attachment_id_user_id_key" ON "user_attachments"("attachment_id", "user_id");

-- AddForeignKey
ALTER TABLE "product_attachments" ADD CONSTRAINT "product_attachments_attachment_id_fkey" FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attachments" ADD CONSTRAINT "product_attachments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_attachments" ADD CONSTRAINT "user_attachments_attachment_id_fkey" FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_attachments" ADD CONSTRAINT "user_attachments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
