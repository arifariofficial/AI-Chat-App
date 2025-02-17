/*
  Warnings:

  - You are about to drop the column `parentId` on the `messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_parentId_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "parentId";
