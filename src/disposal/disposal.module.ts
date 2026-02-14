import { Module } from '@nestjs/common';
import { DisposalController } from './disposal.controller';
import { DisposalService } from './disposal.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DisposalController],
  providers: [DisposalService, PrismaService]
})
export class DisposalModule {}
