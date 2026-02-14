/*
  Warnings:

  - You are about to drop the column `warrantyEnddate` on the `Device` table. All the data in the column will be lost.
  - Added the required column `warrantyEndDate` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "warrantyEnddate",
ADD COLUMN     "warrantyEndDate" DATE NOT NULL;
