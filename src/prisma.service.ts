import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME!,
      port: 5432,
    });
    super({ adapter });
  }
}
