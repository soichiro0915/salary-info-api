/*
  Warnings:

  - You are about to drop the column `month` on the `Term` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Term" DROP COLUMN "month";

-- CreateTable
CREATE TABLE "SalaryInfo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" INTEGER NOT NULL,
    "basicSalary" INTEGER DEFAULT 0,
    "overtimePay" INTEGER DEFAULT 0,
    "allowances" INTEGER DEFAULT 0,
    "bonus" INTEGER DEFAULT 0,
    "otherSalary" INTEGER DEFAULT 0,
    "incomeTax" INTEGER DEFAULT 0,
    "residentTax" INTEGER DEFAULT 0,
    "healthInsurancePremium" INTEGER DEFAULT 0,
    "annuityPrice" INTEGER DEFAULT 0,
    "employmentInsurancePremium" INTEGER DEFAULT 0,
    "federalLawPermits" INTEGER DEFAULT 0,
    "otherDeductin" INTEGER DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "SalaryInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SalaryInfo_termId_month_key" ON "SalaryInfo"("termId", "month");

-- AddForeignKey
ALTER TABLE "SalaryInfo" ADD CONSTRAINT "SalaryInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryInfo" ADD CONSTRAINT "SalaryInfo_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;
