import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserAdminDto } from './dto/CreateUserAdminDto';
import { CompanyService } from 'src/company/company.service';
import * as argon2 from 'argon2';
import { ResponseService } from 'src/response/response.service';
import { LoginUserDto } from './dto/LoginUserDto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly companyService: CompanyService,
    private readonly responseService: ResponseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async registerAdmin(userData: CreateUserAdminDto) {
    // Comprobamos si el email ya está registrado
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return this.responseService.formatResponse(
        false,
        'Ya existe un usuario con el email recibido',
      ); // Usuario ya existe
    }

    // Obtenemos la empresa y oficina default si no existen
    const { companyDefault, officeDefault } =
      await this.companyService.ensureDefaultCompany();

    // Si no se encuentra la empresa o la oficina predeterminada
    if (!companyDefault || !officeDefault) {
      return this.responseService.formatResponse(
        false,
        'No se pudo obtener la empresa o la oficina predeterminada',
      );
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
    await this.prismaService.globalRol.create({
      data: { userId: user.id, rolId: 1 },
    });

    const { password, ...userWithoutPassword } = user;
    // Devolvemos la respuesta con el usuario creado
    return this.responseService.formatResponse(
      true,
      'Usuario registrado correctamente',
      userWithoutPassword,
    );
  }

  async login(loginData: LoginUserDto, resp: Response) {
    // Traerme de base de datos un usuario con ese email
    const user = await this.prismaService.user.findFirst({
      where: { email: loginData.email },
      include: {
        globalRol: {
          include: { rol: { select: { name: true } } },
        },
      },
    });

    if (user) {
      // Si existe el usuario, se compara la contraseña con la enviada
      const isValidatePassword = await this.comparePasswords(
        user.password,
        loginData.password,
      );

      if (!isValidatePassword) {
        return this.responseService.formatResponse(
          false,
          'La contraseña no es correcta, intentelo de nuevo.',
        );
      } else {
        // Creamos el payload del token con solo los datos necesarios
        const payload = {
          id: user.id,
          email: user.email,
          companyId: user.companyId,
          role: user.globalRol[0]?.rol?.name || 'user',
        };
        // Usamos el JwtService para generar el token
        const token = this.jwtService.sign(payload, {
          expiresIn: '1h', // El token expirará en 1 hora
        });

        //guardamos el token en una cookie segura
        resp.cookie('auth_token', token, {
          httpOnly: true,
          secure: false,         // 👈 en local, debe ser false
          sameSite: 'lax',       // 👈 debe ser lax en local
          path: '/',             // 👈 debe estar presente
          maxAge: 3600000,
        });


        return this.responseService.formatResponse(
          true,
          'Usuario logeado exitosamente',
        );
      }
    }

    return this.responseService.formatResponse(
      false,
      'El correo no es correcto, intentelo de nuevo.',
    );
  }

  async getMe(req: Request) {
    const token = req.cookies.auth_token;

    if (!token) {
      throw new UnauthorizedException('No autenticado');
    }

    // Verificar y decodificar el token
    const payload = await this.jwtService.verifyAsync(token);

    // Buscar en base de datos el usuario completo
    const user = await this.prismaService.user.findFirst({
      where: { id: payload.id },
      include: {
        company: true, // incluye toda la compañía
        globalRol: {
          select: {
            id: true,
            rol: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });


    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Excluir la contraseña del usuario antes de devolverlo
    const { password, ...userWithoutPassword } = user;

    return this.responseService.formatResponse(
      true,
      'Usuario autenticado correctamente',
      userWithoutPassword,
    );
  }

  async logout(res: Response) {
    // Eliminar la cookie 'auth_token' enviada al frontend
    res.clearCookie('auth_token', {
      httpOnly: true, // Asegura que no pueda ser accedida desde JS
      secure: this.configService.get<boolean>('COOKIE_SECURE'), // Usa `true` solo si estás usando HTTPS
      sameSite: this.configService.get('SAME_SITE'), // Asegura que la cookie se pueda compartir entre el backend y frontend
    });

    // Enviar respuesta de logout
    res.status(200).json({ success: true, message: 'Usuario deslogueado' });
  }

  // Función para encriptar la contraseña
  async hashPassword(password: string): Promise<string> {
    //const salt = await bcrypt.genSalt(this.saltRounds);
    return await argon2.hash(password);
  }

  // Función para comparar una contraseña ingresada con la encriptada en la base de datos
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(password, hashedPassword);
  }
}
