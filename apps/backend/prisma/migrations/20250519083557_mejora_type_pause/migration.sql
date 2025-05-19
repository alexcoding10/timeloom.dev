-- AlterTable
ALTER TABLE "PauseType" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresNote" BOOLEAN NOT NULL DEFAULT false;
