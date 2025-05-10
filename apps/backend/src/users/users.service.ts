import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsersByCompany(companyId: number) {
    //Devolvemos los usuarios, en principio con su rol
    const users =  await this.prismaService.user.findMany({
        where: { companyId },
        select: {
          id: true,
          name: true,
          email: true,
          imgProfile:true,
          address:true,
          zipCode:true,
          globalRol: {
            select: {
              rol: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      //aplanar los rols
      const result = users.map((user)=>({
        ...user,
        globalRol: user.globalRol ? user.globalRol.map(rol => ({name:rol.rol.name})) : null
      }))
      
      return result
    }
}
