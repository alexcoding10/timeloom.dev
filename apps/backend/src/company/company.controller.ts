import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCompanyDto, CreateCompanyDtoWithUser } from './dto/CreateCompanyDto';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('company')
export class CompanyController {

    constructor(
        private readonly companyService :CompanyService
    ){}

    @Post('create')
    create(@Body() company:CreateCompanyDto){
        return this.companyService.createCompany(company)
    }

    @Post('create-with-user')
    createWithUser(@Body() company:CreateCompanyDtoWithUser){
        return this.companyService.createCompanyWithUser(company)
    }


}
