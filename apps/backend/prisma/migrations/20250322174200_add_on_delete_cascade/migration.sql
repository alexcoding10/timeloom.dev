-- DropForeignKey
ALTER TABLE "GlobalRol" DROP CONSTRAINT "GlobalRol_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRolUser" DROP CONSTRAINT "TeamRolUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkHour" DROP CONSTRAINT "WorkHour_userId_fkey";

-- AddForeignKey
ALTER TABLE "GlobalRol" ADD CONSTRAINT "GlobalRol_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRolUser" ADD CONSTRAINT "TeamRolUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkHour" ADD CONSTRAINT "WorkHour_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
