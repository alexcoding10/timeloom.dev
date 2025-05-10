import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyController } from './company.controller';

@Module({
  providers: [CompanyService],
  imports:[PrismaModule],
  exports: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
