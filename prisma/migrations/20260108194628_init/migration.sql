/*
  Warnings:

  - Added the required column `note` to the `DeviceStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceStatus" ADD COLUMN     "note" VARCHAR(255) NOT NULL;
