/*
  Warnings:

  - Made the column `resource_id` on table `attachment_link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resource_type` on table `attachment_link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linked_at` on table `attachment_link` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ATTACHMENT_STATUS" AS ENUM ('PENDING', 'LINKED', 'EXPIRED');

-- AlterTable
ALTER TABLE "attachment" ADD COLUMN     "status" "ATTACHMENT_STATUS" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "attachment_link" ALTER COLUMN "resource_id" SET NOT NULL,
ALTER COLUMN "resource_type" SET NOT NULL,
ALTER COLUMN "linked_at" SET NOT NULL;
