/*
  Warnings:

  - Made the column `resourceId` on table `attachment_link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resourceType` on table `attachment_link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."attachment" ADD COLUMN "expires_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."attachment_link" ADD COLUMN "linked_at" TIMESTAMP(3);

ALTER TABLE "public"."attachment_link"
  ALTER COLUMN "resourceId" SET NOT NULL,
  ALTER COLUMN "resourceType" SET NOT NULL;
