import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyModule } from 'src/company/company.module';
import { AuthController } from './auth.controller';
import { ResponseModule } from 'src/response/response.module';

@Module({
    imports: [PrismaModule,CompanyModule,ResponseModule],
    providers: [AuthService],
    exports:[AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
