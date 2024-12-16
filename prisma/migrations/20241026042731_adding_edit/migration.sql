-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'EDITOR';

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "edited" TEXT;
