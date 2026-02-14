/*
  Warnings:

  - You are about to drop the column `purchasePrire` on the `Device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "purchasePrire",
ADD COLUMN     "purchasePrice" DECIMAL(65,30);
