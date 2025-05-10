import { Injectable } from '@nestjs/common';
import { Company, Office, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto, CreateCompanyDtoWithUser } from './dto/CreateCompanyDto';
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

    const {userId,...companyData} = company;
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

    return {company,office}
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
            logoUrl: ''
        },
        {
            name: 'officeDefault', 
            email: 'officeDefault@default.com',
            address: '',
            zipCode: '',
            state: ''
        }
      );
      return {companyDefault:result.company,officeDefault:result.office}
    }
    //busca la primera oficina ya que si existe una empresa tiene su oficina
    let officeDefault= await this.prismaService.office.findFirst({where:{companyId:companyDefault?.id}}); 

    //devuelve la company y la oficina
    return {companyDefault,officeDefault};
  }
  
}
