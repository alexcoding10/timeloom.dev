import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))  // Asegúrate de que 'file' coincide con el nombre del campo en el formulario
  uploadFile(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      return { message: 'No se ha recibido ningún archivo.' };
    }

    return {
      message: 'Archivo subido con éxito',
      filePath: `/uploads/${file.filename}`, // Devuelve la URL pública
    };
  }
}
