import { Module } from '@nestjs/common';
import { SigningController } from './signing.controller';
import { SigningService } from './signing.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SigningController],
  providers: [SigningService],
  imports:[PrismaModule]
})
export class SigningModule {}
