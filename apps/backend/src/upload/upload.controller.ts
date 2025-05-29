import { Controller, Post, UseInterceptors, UploadedFile, ParseIntPipe, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('upload')
export class UploadController {
   constructor(private readonly prismaService:PrismaService) {}

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
  @Post('user/:id')
  @UseInterceptors(FileInterceptor('image'))  // Asegúrate de que 'file' coincide con el nombre del campo en el formulario
  async uploadImgProfileByUserId(@Param('id', ParseIntPipe) id: number,  @UploadedFile() image: Express.Multer.File) {

    if (!image) {
      return { message: 'No se ha recibido ningún archivo.' };
    }

    const user = await this.prismaService.user.update({data:{imgProfile:`/uploads/${image.filename}`},where:{id}})
    
    return {
      message: 'usuario con nueva imagen de perfil',
      filePath: `/uploads/${image.filename}`, // Devuelve la URL pública
      user:user
    };
  }
}
