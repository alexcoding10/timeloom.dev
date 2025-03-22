import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { ResponseService } from './response/response.service';
import { ResponseModule } from './response/response.module';



@Module({
  controllers: [AppController],
  providers: [AppService, ResponseService],
  imports: [AuthModule, CompanyModule, ResponseModule],
})
export class AppModule {}
