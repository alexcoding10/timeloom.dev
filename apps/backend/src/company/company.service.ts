import { Injectable } from '@nestjs/common';
import { Company, Office, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCompanyDto,
  CreateCompanyDtoWithUser,
} from './dto/CreateCompanyDto';
import { CreateOfficeDto } from './dto/CreateOfficeDto';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCompany(companyData: CreateCompanyDto) {
    return await this.prismaService.company.create({
      data: {
        ...companyData,
        coordinates: companyData.coordinates ?? Prisma.JsonNull, // ✅ Solución para Prisma
      },
    });
  }

  async createOffice(officeData: CreateOfficeDto) {
    return await this.prismaService.office.create({
      data: {
        ...officeData,
        coordinates: officeData.coordinates ?? Prisma.JsonNull,
      },
    });
  }

  async createCompanyWithUser(company: CreateCompanyDtoWithUser) {
    const { userId, ...companyData } = company;
    //crear la company
    const newCompany = await this.createCompany(companyData);
    //actualizar la company del usuario a la nueva company
    await this.prismaService.user.update({
      where: { id: userId },
      data: { companyId: newCompany.id },
    });
    //devolver la company
    return newCompany;
  }

  async createCompanyWithOffice(
    companyData: CreateCompanyDto,
    officeData: Omit<CreateOfficeDto, 'companyId'>,
  ) {
    //creo la company en la base de datos
    const company = await this.createCompany(companyData);
    // genero la relacion con la oficina
    const newOffice: CreateOfficeDto = { ...officeData, companyId: company.id };
    //guardo la office
    const office = await this.createOffice(newOffice);

    return { company, office };
  }

  async ensureDefaultCompany() {
    // Buscar la empresa default en la base de datos
    let companyDefault = await this.prismaService.company.findFirst({
      where: { name: 'companyDefault' },
    });
    // Si no existe, la creamos junto con su oficina
    if (!companyDefault) {
      const result = await this.createCompanyWithOffice(
        {
          name: 'companyDefault',
          email: 'companyDefault@default.com',
          address: '',
          zipCode: '',
          logoUrl: '',
        },
        {
          name: 'officeDefault',
          email: 'officeDefault@default.com',
          address: '',
          zipCode: '',
          state: '',
        },
      );
      return { companyDefault: result.company, officeDefault: result.office };
    }
    //busca la primera oficina ya que si existe una empresa tiene su oficina
    let officeDefault = await this.prismaService.office.findFirst({
      where: { companyId: companyDefault?.id },
    });

    //devuelve la company y la oficina
    return { companyDefault, officeDefault };
  }

  //region Deduction
  async createDeduction(newDeduction: Prisma.DeductionCreateInput) {
    return this.prismaService.deduction.create({
      data: newDeduction,
    });
  }

  async getDeductions(companyId?: number) {
    return await this.prismaService.deduction.findMany({
      where: companyId
        ? { OR: [{ companyId }, { companyId: null }] }
        : { companyId: null },
    });
  }

  async deletedDeduction(idDeduction: number) {
    return await this.prismaService.deduction.delete({
      where: { id: idDeduction },
    });
  }
  //enregion

  //region Bonus
  async createBonus(newBonus: Prisma.BonusCreateInput) {
    return this.prismaService.bonus.create({
      data: newBonus,
    });
  }

  // bonus siempre tiene un companyId
  async getBonus(companyId: number) {
    return await this.prismaService.bonus.findMany({
      where: { companyId },
    });
  }

  async deletedBonus(idBonus: number) {
    return await this.prismaService.bonus.delete({ where: { id: idBonus } });
  }
  //enregion

  //region Roles
  async getRoles(companyId?: number) {
    return await this.prismaService.rol.findMany({
      where: companyId
        ? { OR: [{ companyId }, { companyId: null }] }
        : { companyId: null },
    });
  }

  async deletedRole(id: number) {
    return await this.prismaService.rol.delete({ where: { id } });
  }

  async createRole(newRole: Prisma.RolCreateInput) {
    return this.prismaService.rol.create({
      data: newRole,
    });
  }
  //endregion

async getBalancesCompany(companyId: number, startDate?: Date, endDate?: Date) {
  const company = await this.prismaService.company.findFirst({
    where: { id: companyId },
    include: {
      users: {
        select: {
          id: true,
          timeEntries: {
            where: {
              ...(startDate && { clockIn: { gte: startDate } }),
              ...(endDate && { clockOut: { lte: endDate } }),
            },
            include: {
              timebreaks: true,
            },
          },
          contract: {
            select: {
              id: true,
              salaryHours: true,
            },
          },
        },
      },
    },
  });

  if (!company) {
    return 'No se encontró la empresa';
  }

  const workers = company.users.length;
  let totalWorkedHours = 0;
  let totalPayment = 0;

  for (const user of company.users) {
    let userTotalSeconds = 0;

    for (const entry of user.timeEntries) {
      if (!entry.clockIn || !entry.clockOut) continue;

      const clockIn = new Date(entry.clockIn);
      const clockOut = new Date(entry.clockOut);
      let durationSeconds = (clockOut.getTime() - clockIn.getTime()) / 1000;

      // Restar pausas
      for (const pause of entry.timebreaks) {
        if (!pause.clockIn || !pause.clockOut) continue;
        const pauseIn = new Date(pause.clockIn);
        const pauseOut = new Date(pause.clockOut);
        durationSeconds -= (pauseOut.getTime() - pauseIn.getTime()) / 1000;
      }

      userTotalSeconds += durationSeconds;
    }

    const userWorkedHours = userTotalSeconds / 3600;
    totalWorkedHours += userWorkedHours;

    const salaryPerHour = user.contract?.[0]?.salaryHours || 0;
    totalPayment += userWorkedHours * salaryPerHour;
  }

  return {
    workers,
    totalWorkedHours: Number(totalWorkedHours.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
  };
}


}
