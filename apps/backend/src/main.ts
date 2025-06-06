import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  // Configuración personalizada de CORS
  app.enableCors({
    origin: ['http://localhost:3000','http://192.168.68.100:3000','http://localhost:3030','http://192.168.68.100:3030','http://85.219.2.167'], // Permite peticiones desde cualquier origen
    credentials: true, // Permite el uso de credenciales como cookies y cabeceras de autorización
  });

  //app.setGlobalPrefix('api')

   const port = process.env.PORT || 3001; // <-- PORT
 
  await app.listen(port,'0.0.0.0');
  console.log(`App is running on http://localhost:${port}`);

}

bootstrap();
