-- CreateEnum
CREATE TYPE "TypeDeduction" AS ENUM ('FIXED', 'TEMPORARY', 'ALL');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "irpf_percentage" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Deduction" ADD COLUMN     "type" "TypeDeduction";
