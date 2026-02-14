import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [MaintenanceService, PrismaService],
  controllers: [MaintenanceController]
})
export class MaintenanceModule {}
