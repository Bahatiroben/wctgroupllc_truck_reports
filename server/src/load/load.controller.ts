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
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateLoadDto, UpdateLoadDto } from './dto/index';
import { LoadService } from './load.service';

@Controller('load')
export class LoadController {
  constructor(private readonly loadService: LoadService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createLoadDto: CreateLoadDto,
  ) {
    const resp = await this.loadService.create(createLoadDto);
    return response.status(HttpStatus.CREATED).json(resp);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const resp = await this.loadService.findAll();
    return response.status(HttpStatus.OK).json(resp);
  }

  @Get('getByDriver')
  async findByDriver(
    @Query('driverId') driverId: string,
    @Query('max') max: Date,
    @Query('min') min: Date,
    @Res() response: Response,
  ) {
    const resp = await this.loadService.getByDriver(driverId, {
      min,
      max,
    });
    return response.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:loadId')
  async delete(@Res() response: Response, @Param() params: { loadId: string }) {
    const resp = await this.loadService.deleteOne(params.loadId);
    return response.status(HttpStatus.OK).json(resp);
  }

  @Patch('/:loadId')
  async update(
    @Res() response: Response,
    @Body() loadDetails: UpdateLoadDto,
    @Param() params: { loadId: string },
  ) {
    const resp = await this.loadService.update(params.loadId, loadDetails);
    return response.status(HttpStatus.OK).json(resp);
  }
}
