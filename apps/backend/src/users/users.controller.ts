import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ){}

    @Get('company/:companyId')
    async getByCompanyId(@Param('companyId') companyId: string, @Res() res: Response) {
      const id = parseInt(companyId, 10);
      const users = await this.usersService.getUsersByCompany(id);
  
      return res.status(200).json({ data: users });
    }

    @Post('create-with-contract')
    async createUserWithContract(
      @Body() body: { user: Prisma.UserCreateInput; contract:  Omit<Prisma.ContractUncheckedCreateInput, 'userId' >},
    ) {
      const { user, contract } = body;
  
      // Llamamos al servicio que maneja la lógica de crear el usuario y el contrato
      return await this.usersService.createUserWhithContract(user, contract);
    }
  }



