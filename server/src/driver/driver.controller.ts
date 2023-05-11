import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Delete,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateDriverDto, UpdateDriverDto } from './dto/index';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createDriverDto: CreateDriverDto,
  ) {
    const resp = await this.driverService.create(createDriverDto);
    return response.status(HttpStatus.CREATED).json(resp);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const resp = await this.driverService.findAll();
    return response.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:driverId')
  async delete(
    @Res() response: Response,
    @Param() params: { driverId: string },
  ) {
    const resp = await this.driverService.deleteOne(params.driverId);
    return response.status(HttpStatus.OK).json(resp);
  }

  @Patch('/:driverId')
  async update(
    @Res() response: Response,
    @Body() driverDetails: UpdateDriverDto,
    @Param() params: { driverId: string },
  ) {
    const resp = await this.driverService.update(
      params.driverId,
      driverDetails,
    );
    return response.status(HttpStatus.OK).json(resp);
  }
}
