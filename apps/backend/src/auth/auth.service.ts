import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserAdminDto } from './dto/CreateUserAdminDto';
import { CompanyService } from 'src/company/company.service';
import * as bcrypt from 'bcrypt';
import { ResponseService } from 'src/response/response.service';

@Injectable()
export class AuthService {
  // SaltRounds es un valor constante, no necesita ser inyectado
  private readonly saltRounds = 10;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly companyService: CompanyService,
    private readonly responseService: ResponseService, // Asegúrate de que ResponseService esté correctamente inyectado
  ) {}

  // Todo método de registro
  async registerAdmin(userData: CreateUserAdminDto) {
    // Comprobamos si el email ya está registrado
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return this.responseService.formatResponse(false, 'Ya existe un usuario con el email recibido'); // Usuario ya existe
    }

    // Obtenemos la empresa y oficina default si no existen
    const { companyDefault, officeDefault } = await this.companyService.ensureDefaultCompany();

    // Si no se encuentra la empresa o la oficina predeterminada
    if (!companyDefault || !officeDefault) {
      return this.responseService.formatResponse(false, 'No se pudo obtener la empresa o la oficina predeterminada');
    }

    // Encriptar el password
    const passwordHash = await this.hashPassword(userData.password);

    // Creamos el nuevo usuario
    const newUser: Omit<User, 'id'> = {
      ...userData,
      password: passwordHash,
      companyId: companyDefault.id,
      officeId: officeDefault.id,
      address: null,
      zipCode: null,
      imgProfile: null,
    };

    const user = await this.prismaService.user.create({ data: newUser });

    // Asignamos el rol de admin
    await this.prismaService.globalRol.create({ data: { userId: user.id, rolId: 1 } });

    // Devolvemos la respuesta con el usuario creado
    return this.responseService.formatResponse(true, 'Usuario registrado correctamente', user);
  }

  // Función para encriptar la contraseña
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  // Función para comparar una contraseña ingresada con la encriptada en la base de datos
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
