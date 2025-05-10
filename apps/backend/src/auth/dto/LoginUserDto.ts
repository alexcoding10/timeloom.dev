import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;
  //@IsStrongPassword() //! puede fallar si no se hace una buena verificacion en el front
  password: string;
}
