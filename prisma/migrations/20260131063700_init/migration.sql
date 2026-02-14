-- DropForeignKey
ALTER TABLE "DeviceDisposals" DROP CONSTRAINT "DeviceDisposals_approvedBy_fkey";

-- AlterTable
ALTER TABLE "DeviceDisposals" ALTER COLUMN "approvedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DeviceDisposals" ADD CONSTRAINT "DeviceDisposals_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
