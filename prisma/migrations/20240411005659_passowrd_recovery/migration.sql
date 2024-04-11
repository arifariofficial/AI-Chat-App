-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordExpires" INTEGER DEFAULT 0,
ADD COLUMN     "resetPasswordToken" TEXT DEFAULT '';
