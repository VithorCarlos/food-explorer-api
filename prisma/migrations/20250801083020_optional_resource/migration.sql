-- AlterTable
ALTER TABLE "public"."attachment_link" ALTER COLUMN "resourceId" DROP NOT NULL,
ALTER COLUMN "resourceType" DROP NOT NULL;
