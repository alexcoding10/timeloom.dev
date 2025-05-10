import { Controller, Get, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

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

}
