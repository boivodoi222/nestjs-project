-- CreateTable
CREATE TABLE "Device" (
    "deviceId" SERIAL NOT NULL,
    "deviceCode" VARCHAR(50) NOT NULL,
    "deviceName" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "deviceType" VARCHAR(50) NOT NULL,
    "manufacturer" VARCHAR(100) NOT NULL,
    "serialNumber" VARCHAR(100) NOT NULL,
    "assetTag" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "purchaseDate" DATE NOT NULL,
    "warrantyEndDate" DATE NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Device_pkey" PRIMARY KEY ("deviceId")
);

-- CreateTable
CREATE TABLE "DeviceStatus" (
    "statusId" SERIAL NOT NULL,
    "statusName" VARCHAR(50) NOT NULL,

    CONSTRAINT "DeviceStatus_pkey" PRIMARY KEY ("statusId")
);

-- CreateTable
CREATE TABLE "DeviceStatusHistory" (
    "statusHistoryId" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceStatusHistory_pkey" PRIMARY KEY ("statusHistoryId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceCode_key" ON "Device"("deviceCode");

-- CreateIndex
CREATE UNIQUE INDEX "Device_serialNumber_key" ON "Device"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Device_assetTag_key" ON "Device"("assetTag");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceStatus_statusName_key" ON "DeviceStatus"("statusName");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "DeviceStatus"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceStatusHistory" ADD CONSTRAINT "DeviceStatusHistory_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceStatusHistory" ADD CONSTRAINT "DeviceStatusHistory_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "DeviceStatus"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;
