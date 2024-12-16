/*
  Warnings:

  - You are about to drop the column `content` on the `prompts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `prompts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "content",
DROP COLUMN "name",
ADD COLUMN     "guidelines" TEXT,
ADD COLUMN     "guidelinesPurpose" TEXT,
ADD COLUMN     "instructions" TEXT,
ADD COLUMN     "instructionsPurpose" TEXT,
ADD COLUMN     "keyPointers" TEXT,
ADD COLUMN     "keyPointersPurpose" TEXT,
ADD COLUMN     "responseLimitations" TEXT,
ADD COLUMN     "responseLimitationsPurpose" TEXT,
ADD COLUMN     "roleDefinition" TEXT,
ADD COLUMN     "roleDefinitionPurpose" TEXT,
ADD COLUMN     "userContext" TEXT,
ADD COLUMN     "userContextPurpose" TEXT;
