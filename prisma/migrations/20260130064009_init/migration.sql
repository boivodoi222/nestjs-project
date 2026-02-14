/*
  Warnings:

  - You are about to drop the column `deviceTypeID` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseDate` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `warrantyEndDate` on the `Device` table. All the data in the column will be lost.
  - Added the required column `deviceTypeId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasedate` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warrantyEnddate` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "deviceTypeID",
DROP COLUMN "purchaseDate",
DROP COLUMN "warrantyEndDate",
ADD COLUMN     "deviceTypeId" INTEGER NOT NULL,
ADD COLUMN     "purchasedate" DATE NOT NULL,
ADD COLUMN     "warrantyEnddate" DATE NOT NULL;

-- CreateTable
CREATE TABLE "Departments" (
    "departmentId" SERIAL NOT NULL,
    "departmentName" VARCHAR(100) NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("departmentId")
);

-- CreateTable
CREATE TABLE "DeviceTypes" (
    "deviceTypeId" SERIAL NOT NULL,
    "typeName" VARCHAR(50) NOT NULL,

    CONSTRAINT "DeviceTypes_pkey" PRIMARY KEY ("deviceTypeId")
);

-- CreateTable
CREATE TABLE "DeviceAssignments" (
    "assignmentId" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "assigneddate" TIMESTAMP(3) NOT NULL,
    "returneddate" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "DeviceAssignments_pkey" PRIMARY KEY ("assignmentId")
);

-- CreateTable
CREATE TABLE "DeviceDisposals" (
    "disposalId" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "disposaldate" TIMESTAMP(3) NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "finalStatus" VARCHAR(100) NOT NULL,
    "remainingValue" DECIMAL(18,2) NOT NULL,
    "approvedBy" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "DeviceDisposals_pkey" PRIMARY KEY ("disposalId")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "maintenanceId" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "reportedBy" INTEGER NOT NULL,
    "maintenancedate" DATE NOT NULL,
    "nextMaintenancedate" DATE NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("maintenanceId")
);

-- CreateTable
CREATE TABLE "RequestType" (
    "requestTypeId" SERIAL NOT NULL,
    "requestTypeName" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "RequestType_pkey" PRIMARY KEY ("requestTypeId")
);

-- CreateTable
CREATE TABLE "Requests" (
    "requestId" SERIAL NOT NULL,
    "requestTypeId" INTEGER NOT NULL,
    "requestedBy" INTEGER NOT NULL,
    "requestdate" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(255),
    "approvedBy" INTEGER,
    "approveddate" TIMESTAMP(3),
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("requestId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Maintenance_deviceId_key" ON "Maintenance"("deviceId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_deviceTypeId_fkey" FOREIGN KEY ("deviceTypeId") REFERENCES "DeviceTypes"("deviceTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAssignments" ADD CONSTRAINT "DeviceAssignments_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAssignments" ADD CONSTRAINT "DeviceAssignments_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAssignments" ADD CONSTRAINT "DeviceAssignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceDisposals" ADD CONSTRAINT "DeviceDisposals_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceDisposals" ADD CONSTRAINT "DeviceDisposals_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_reportedBy_fkey" FOREIGN KEY ("reportedBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_requestTypeId_fkey" FOREIGN KEY ("requestTypeId") REFERENCES "RequestType"("requestTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_requestedBy_fkey" FOREIGN KEY ("requestedBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
