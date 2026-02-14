import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { PrismaService } from 'src/prisma.service';
import { AssignmentController } from './assignment.controller';

@Module({
  controllers: [AssignmentController],
  providers: [AssignmentService, PrismaService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
