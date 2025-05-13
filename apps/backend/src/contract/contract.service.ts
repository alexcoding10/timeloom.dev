import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContractService {
  constructor(private readonly prismaService: PrismaService) {}

  async createContract (contract:Prisma.ContractCreateInput){
    const newContract = await this.prismaService.contract.create({data:contract})
  }

}
