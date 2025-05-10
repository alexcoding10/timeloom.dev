import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserAdminDto } from './dto/CreateUserAdminDto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUserDto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create/admin')
  async createAdminUser(@Body() user: CreateUserAdminDto) {
    return await this.authService.registerAdmin(user);
  }

  @Post('login')
  async login(@Body() loginData:LoginUserDto , @Res() res:Response){
    const response =  await this.authService.login(loginData,res);
    return res.status(200).json(response)
  }


  @Get('logout')
  async logout(@Res() res:Response){
    return await this.authService.logout(res);
  }

  @Get('me')
  async getMe(@Req() req:Request){
    return await this.authService.getMe(req);
  }
}
