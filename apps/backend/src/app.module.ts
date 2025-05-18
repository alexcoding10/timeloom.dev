import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { ResponseService } from './response/response.service';
import { ResponseModule } from './response/response.module';
import { AddressModule } from './address/address.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { ContractModule } from './contract/contract.module';
import { ConfigModule } from '@nestjs/config';
import { SigningModule } from './signing/signing.module';



@Module({
  controllers: [AppController],
  providers: [AppService, ResponseService],
  imports: [AuthModule, CompanyModule, ResponseModule, AddressModule, UploadModule, UsersModule, ContractModule,ConfigModule.forRoot({
    isGlobal: true,
  }), SigningModule,],
})
export class AppModule {}
