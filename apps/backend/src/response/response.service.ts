import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  // Método para formatear la respuesta de la API
  formatResponse(success: boolean, message: string, data: any = null) {
    return {
      success,
      message,
      data,
    };
  } 
}
