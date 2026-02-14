-- AlterTable
ALTER TABLE "Maintenance" ALTER COLUMN "maintenancedate" DROP NOT NULL,
ALTER COLUMN "maintenancedate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "nextMaintenancedate" DROP NOT NULL,
ALTER COLUMN "nextMaintenancedate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "description" DROP NOT NULL;
