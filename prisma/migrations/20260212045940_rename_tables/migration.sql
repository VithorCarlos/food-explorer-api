/*
  Warnings:

  - You are about to drop the column `attachmentId` on the `attachment_link` table. All the data in the column will be lost.
  - You are about to drop the column `resourceId` on the `attachment_link` table. All the data in the column will be lost.
  - You are about to drop the column `resourceType` on the `attachment_link` table. All the data in the column will be lost.
  - You are about to drop the column `snackId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `expiresIn` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `snacks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attachment_id` to the `attachment_link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `snack_id` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `snacks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attachment_link" DROP CONSTRAINT "attachment_link_attachmentId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_snackId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_userId_fkey";

-- DropForeignKey
ALTER TABLE "snacks" DROP CONSTRAINT "snacks_userId_fkey";

-- DropIndex
DROP INDEX "refresh_tokens_userId_key";

-- AlterTable
ALTER TABLE "attachment_link" DROP COLUMN "attachmentId",
DROP COLUMN "resourceId",
DROP COLUMN "resourceType",
ADD COLUMN     "attachment_id" TEXT NOT NULL,
ADD COLUMN     "resource_id" TEXT,
ADD COLUMN     "resource_type" "RESOURSE_TYPE";

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "snackId",
DROP COLUMN "userId",
ADD COLUMN     "snack_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "expiresIn",
DROP COLUMN "userId",
ADD COLUMN     "expires_in" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "snacks" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_user_id_key" ON "refresh_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "snacks" ADD CONSTRAINT "snacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_snack_id_fkey" FOREIGN KEY ("snack_id") REFERENCES "snacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment_link" ADD CONSTRAINT "attachment_link_attachment_id_fkey" FOREIGN KEY ("attachment_id") REFERENCES "attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
