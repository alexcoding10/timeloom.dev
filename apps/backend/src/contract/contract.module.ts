import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  imports:[PrismaModule]
})
export class ContractModule {}
