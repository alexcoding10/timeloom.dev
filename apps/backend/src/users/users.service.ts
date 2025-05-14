import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService
  
  ) {}

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

    async createUser(userData:Prisma.UserCreateInput){
      const newUser = await this.prismaService.user.create({data:userData})
      return newUser
    }

    async createUserWhithContract(
      userData: Prisma.UserCreateInput,
      contractData: Omit<Prisma.ContractUncheckedCreateInput, 'userId'> // omitimos porque lo añadiremos
    ) {
      try{
        const existingUser = await this.prismaService.user.findUnique({
          where: { email: userData.email },
        });
        if (existingUser) {
          throw new Error('Ya existe un usuario con el email recibido');
        }
        const passwordHash = await this.authService.hashPassword(userData.password);
        const user:Prisma.UserCreateInput = {
          ...userData,
          password:passwordHash,
        }
      const newUser = await this.prismaService.user.create({ data: user });
      //Usuario creado
      
      //Ahora creamos el contrato
      const updateContract: Prisma.ContractUncheckedCreateInput = {
        ...contractData,
        userId: newUser.id,
      };
      const newContract = await this.prismaService.contract.create({ data: updateContract });
      return { newUser, newContract };
    }catch(error){
      throw error
    }
  }


}
