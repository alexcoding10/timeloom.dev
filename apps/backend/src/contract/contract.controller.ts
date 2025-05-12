import { Body, Controller, Post,Get, Param, Res, ParseIntPipe, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('contract')
export class ContractController {

    constructor(private readonly contractService:ContractService){}

    @Post('/create/deduction')
    async createDeduction(@Body() deduction:Prisma.DeductionCreateInput,@Res() res:Response){
        try {
            const result = await this.contractService.createDeduction(deduction);
            return res.status(201).json(result);
          } catch (error) {
            return res.status(400).json({ message: 'Error al crear deducción', error });
          }
    }

    @Get('/deductions/:idCompany')
    async getDeduction(@Param('idCompany') idCompany:string, @Res() res:Response){
        try {
            const id = parseInt(idCompany, 10);
            const deductions = await this.contractService.getAllDeduction(id)
            return res.status(200).json({data:deductions})
            
        } catch (error) {
            return res.status(400).json({ message: 'Error al obtener deducción', error });
        }
    }

    @Delete('/deduction/:id')
    async deleteDeduction(@Param('id', ParseIntPipe) id: number) {
        return await this.contractService.deletedDeduction(id);
      }


    @Post('/create/bonus')
    async createBonus(@Body() bonus:Prisma.BonusCreateInput,@Res() res:Response){
        try {
            const result = await this.contractService.createBonus(bonus);
            return res.status(201).json(result);
          } catch (error) {
            return res.status(400).json({ message: 'Error al crear deducción', error });
          }
    }

    @Get('/bonus/:idCompany')
    async getBonus(@Param('idCompany') idCompany:string, @Res() res:Response){
        try {
            const id = parseInt(idCompany, 10);
            const deductions = await this.contractService.getAllBonus(id)
            return res.status(200).json({data:deductions})
            
        } catch (error) {
            return res.status(400).json({ message: 'Error al obtener deducción', error });
        }
    }

    @Delete('/bonus/:id')
    async deleteBonus(@Param('id', ParseIntPipe) id: number) {
        return await this.contractService.deletedBonus(id);
      }

}
