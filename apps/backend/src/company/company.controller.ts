import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCompanyDto, CreateCompanyDtoWithUser } from './dto/CreateCompanyDto';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('company')
export class CompanyController {

    constructor(
        private readonly companyService: CompanyService
    ) { }

    @Post('create')
    create(@Body() company: CreateCompanyDto) {
        return this.companyService.createCompany(company)
    }

    @Post('create-with-user')
    createWithUser(@Body() company: CreateCompanyDtoWithUser) {
        return this.companyService.createCompanyWithUser(company)
    }

    @Get('roles')
    getAllRoles() {
        return this.companyService.getRoles();
    }

    @Get('/:companyId/roles')
    getRolesByCompany(@Param('companyId', ParseIntPipe) companyId: number) {
        return this.companyService.getRoles(companyId);
    }

    @Get('/:companyId/bonus')
    getBonusByCompany(@Param('companyId', ParseIntPipe) companyId: number) {
        return this.companyService.getBonus(companyId);
    }

    @Get('/:companyId/deductions')
    getDeductionsByCompany(@Param('companyId', ParseIntPipe) companyId: number) {
        return this.companyService.getDeductions(companyId);
    }

    @Get('deductions')
    getAllDeductions() {
        return this.companyService.getDeductions();
    }

    @Post('/create/deduction')
    async createDeduction(@Body() deduction: Prisma.DeductionCreateInput, @Res() res: Response) {
        try {
            const result = await this.companyService.createDeduction(deduction);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: 'Error al crear deducción', error });
        }
    }

    @Post('/create/bonus')
    async createBonus(@Body() bonus: Prisma.BonusCreateInput, @Res() res: Response) {
        try {
            const result = await this.companyService.createBonus(bonus);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: 'Error al crear deducción', error });
        }
    }

    @Post('/create/role')
    async createRole(@Body() role: Prisma.RolCreateInput, @Res() res: Response) {
        try {
            const result = await this.companyService.createRole(role);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: 'Error al crear rol', error });
        }
    }



    @Delete('/deduction/:id')
    async deleteDeduction(@Param('id', ParseIntPipe) id: number) {
        return await this.companyService.deletedDeduction(id);
    }


    @Delete('/bonus/:id')
    async deleteBonus(@Param('id', ParseIntPipe) id: number) {
        return await this.companyService.deletedBonus(id);
    }

    @Delete('/role/:id')
    async deleteRole(@Param('id', ParseIntPipe) id: number) {
        return await this.companyService.deletedRole(id);
    }



}
