import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './module/device/device.module';
import { RequestModule } from './module/request/request.module';
import { AssignmentController } from './module/assignment/assignment.controller';
import { AssignmentModule } from './module/assignment/assignment.module';
import { MaintenanceModule } from './module/maintenance/maintenance.module';
import { DisposalModule } from './module/disposal/disposal.module';
import { ReportModule } from './module/report/report.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), UserModule, AuthModule, DeviceModule, RequestModule, AssignmentModule, MaintenanceModule, DisposalModule, ReportModule],
  controllers: [AppController, AssignmentController],
  providers: [AppService],
})
export class AppModule { }
