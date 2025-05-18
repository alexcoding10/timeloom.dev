// signing.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SigningService } from './signing.service';
import { Prisma } from '@prisma/client';

@Controller('signings')
export class SigningController {
  constructor(private readonly signingService: SigningService) {}

  @Post('start/:userId')
  async startSigning(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: Prisma.TimeEntryCreateInput,
  ) {
    return this.signingService.start(userId, data);
  }

  @Post('pause')
  async createPause(@Body() data: Prisma.TimeBreakCreateInput) {
    return this.signingService.createPause(data);
  }

  @Post('pause/stop/:id')
  async stopPause(
    @Param('id', ParseIntPipe) id: number,
    @Body('clockOut') clockOut: Date,
  ) {
    return this.signingService.stopPause(id, new Date(clockOut));
  }

  @Post('finish/:id')
  async finish(
    @Param('id', ParseIntPipe) id: number,
    @Body('clockOut') clockOut: Date,
  ) {
    return this.signingService.finish(id, new Date(clockOut));
  }

  @Get('user/:userId')
  async getUserSignings(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.signingService.getSignigsByUser(
      userId,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }

  @Get('company/:companyId')
  async getCompanySignings(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('skip') skip = '0',
    @Query('take') take = '50',
  ) {
    return this.signingService.getSigningsByCompany(
      companyId,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
      Number(skip),
      Number(take),
    );
  }
}
