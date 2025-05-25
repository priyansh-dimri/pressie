import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Prisma Service will be used in many other modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
