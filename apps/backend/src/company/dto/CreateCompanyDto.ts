import { JsonValue } from "@prisma/client/runtime/library";
import { IsEmail, IsNotEmpty, IsObject, IsOptional } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email:string

    @IsOptional()
    address:string;

    @IsOptional()
    zipCode:string;

    @IsOptional()
    logoUrl:string;

    @IsOptional()
    @IsObject()
    coordinates?: Record<string, any>; // ✅ Mejor opción para JSON
}