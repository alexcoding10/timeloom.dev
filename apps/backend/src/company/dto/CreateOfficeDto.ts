
import { IsEmail, IsNumber, IsObject, IsOptional } from "class-validator";
import { CreateCompanyDto } from "./CreateCompanyDto";

export class CreateOfficeDto {
    name:string;
    @IsEmail()
    email:string;

    @IsOptional()
    address:string;

    @IsOptional()
    zipCode:string;

    @IsOptional()
    @IsObject()
    coordinates?: Record<string, any>; // ✅ Mejor opción para JSON

    @IsNumber()
    companyId:number

    @IsOptional()
    state:string
}

export class createCompanyWhitOfficeDto extends CreateCompanyDto{

}