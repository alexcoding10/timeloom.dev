import { Controller, Get, Query } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService:AddressService){}

    @Get('search')
    async search(@Query('q') query:string){
        return this.addressService.search(query);
    }
}
