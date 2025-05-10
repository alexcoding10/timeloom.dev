import { IsEmail, IsString, IsStrongPassword } from "class-validator";


export class CreateUserAdminDto {
    @IsString()
    name:string;
    @IsEmail()
    email:string;
    //@IsStrongPassword() //! puede fallar si no se hace una buena verificacion en el front
    password:string;
}