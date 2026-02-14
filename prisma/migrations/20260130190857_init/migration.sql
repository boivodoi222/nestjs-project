/*
  Warnings:

  - You are about to drop the column `purchasedate` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `approveddate` on the `Requests` table. All the data in the column will be lost.
  - Added the required column `purchaseDate` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "purchasedate",
ADD COLUMN     "purchaseDate" DATE NOT NULL;

-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "approveddate",
ADD COLUMN     "approvedDate" TIMESTAMP(3);
