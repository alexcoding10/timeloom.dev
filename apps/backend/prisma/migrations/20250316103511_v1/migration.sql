-- AlterTable
ALTER TABLE "Rol" ADD COLUMN     "companyId" INTEGER;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "companyId" INTEGER;

-- AddForeignKey
ALTER TABLE "Rol" ADD CONSTRAINT "Rol_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
