/*
  Warnings:

  - Made the column `userId` on table `snacks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "snacks" DROP CONSTRAINT "snacks_userId_fkey";

-- AlterTable
ALTER TABLE "snacks" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "snacks" ADD CONSTRAINT "snacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
