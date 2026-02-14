import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './device/device.module';
import { RequestModule } from './request/request.module';
import { AssignmentController } from './assignment/assignment.controller';
import { AssignmentModule } from './assignment/assignment.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { DisposalModule } from './disposal/disposal.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), UserModule, AuthModule, DeviceModule, RequestModule, AssignmentModule, MaintenanceModule, DisposalModule, ReportModule],
  controllers: [AppController, AssignmentController],
  providers: [AppService],
})
export class AppModule { }
