import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContractService {
  constructor(private readonly prismaService: PrismaService) {}

  //region Deduction
  async createDeduction(newDeduction: Prisma.DeductionCreateInput) {
    return this.prismaService.deduction.create({
      data: newDeduction,
    });
  }

  async getAllDeduction(companyId: number) {
    return this.prismaService.deduction.findMany({
      where: { OR: [{ companyId }, { companyId: null }] },
    });
  }

  async deletedDeduction(idDeduction:number){
    return await this.prismaService.deduction.delete({where:{id:idDeduction}})
  }
  //enregion

  //region Bonus
  async createBonus(newBonus: Prisma.BonusCreateInput) {
    return this.prismaService.bonus.create({
      data: newBonus,
    });
  }

  async getAllBonus(companyId: number) {
    return this.prismaService.bonus.findMany({
      where: { OR: [{ companyId }, { companyId: null }] },
    });
  }

  async deletedBonus(idBonus:number){
    return await this.prismaService.bonus.delete({where:{id:idBonus}})
  }
  //enregion
}
