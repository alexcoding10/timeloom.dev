import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserAdminDto } from './dto/CreateUserAdminDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create/admin')
  async createAdminUser(@Body() user: CreateUserAdminDto) {
    console.log('peticion')
    return await this.authService.registerAdmin(user);
  }
}
