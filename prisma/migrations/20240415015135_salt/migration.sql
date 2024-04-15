-- AlterTable
ALTER TABLE "User" ADD COLUMN     "salt" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
