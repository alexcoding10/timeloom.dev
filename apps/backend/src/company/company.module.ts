import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CompanyService],
  imports:[PrismaModule],
  exports: [CompanyService]
})
export class CompanyModule {}
