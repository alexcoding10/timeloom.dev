import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyModule } from 'src/company/company.module';
import { ResponseModule } from 'src/response/response.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Asegúrate de importar ConfigModule
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    CompanyModule,
    ResponseModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de que ConfigModule esté en la lista de imports
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Obtener la clave secreta de .env
        signOptions: { expiresIn: '1h' }, // El token expira en 1 hora
      }),
    }),
    ConfigModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
