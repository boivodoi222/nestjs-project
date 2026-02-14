/*
  Warnings:

  - You are about to drop the column `deviceType` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Device` table. All the data in the column will be lost.
  - Added the required column `deviceTypeID` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_statusId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "deviceType",
DROP COLUMN "manufacturer",
DROP COLUMN "statusId",
ADD COLUMN     "deviceTypeID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" VARCHAR(100) NULL,
ADD COLUMN     "fullName" VARCHAR(100) NULL;
