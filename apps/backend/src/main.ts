import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  // Configuración personalizada de CORS
  app.enableCors({
    origin: ['http://localhost:3000','http://192.168.68.104:3000'], // Permite peticiones desde cualquier origen
    credentials: true, // Permite el uso de credenciales como cookies y cabeceras de autorización
  });

  
 
  await app.listen(process.env.PORT ?? 3001,'0.0.0.0');
}

bootstrap();
