/*
  Warnings:

  - You are about to drop the column `otherDeductin` on the `SalaryInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalaryInfo" DROP COLUMN "otherDeductin",
ADD COLUMN     "otherDeduction" INTEGER DEFAULT 0;
