import { Body, Controller, Post,Get, Param, Res, ParseIntPipe, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('contract')
export class ContractController {

    constructor(private readonly contractService:ContractService){}

    @Get('user/:id')
    getContractByUser (@Param('id',ParseIntPipe)  id:number){
        return this.contractService.findByUserId(id)
    }

}
