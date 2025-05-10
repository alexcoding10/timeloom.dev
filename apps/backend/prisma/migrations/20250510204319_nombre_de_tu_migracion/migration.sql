/*
  Warnings:

  - Added the required column `hoursForWeek` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bonus" ADD COLUMN     "companyId" INTEGER;

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "hoursForWeek" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Deduction" ADD COLUMN     "companyId" INTEGER;

-- AddForeignKey
ALTER TABLE "Deduction" ADD CONSTRAINT "Deduction_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bonus" ADD CONSTRAINT "Bonus_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
