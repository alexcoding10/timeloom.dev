import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UploadController } from './upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Carpeta donde se guardarán los archivos
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname)); // Guardar con un nombre único
        },
      }),
    }),
    ServeStaticModule.forRoot({
        rootPath:join(__dirname,'..', '..','uploads'),
        serveRoot:'/uploads'
    })
  ],
  controllers: [UploadController], // Asegúrate de importar el controlador
})
export class UploadModule {}
