import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // src/prisma/prisma.service.ts

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'test') {
      await this.user.deleteMany();
      await this.workout.deleteMany();
      await this.exercise.deleteMany();
    }
  }
}
