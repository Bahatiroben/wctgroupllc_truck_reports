import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IDriver } from './interfaces/index';
import { CreateDriverDto, UpdateDriverDto } from './dto/index';
import { DRIVER_MODEL } from './constants/index';

@Injectable()
export class DriverService {
  constructor(
    @Inject(DRIVER_MODEL)
    private driverModel: Model<IDriver>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<IDriver> {
    const createdCat = new this.driverModel(createDriverDto);
    return createdCat.save();
  }

  async findAll(): Promise<IDriver[]> {
    return this.driverModel.find();
  }

  async deleteOne(id: string): Promise<boolean> {
    return await this.driverModel.findByIdAndRemove(id);
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<IDriver> {
    return await this.driverModel.findByIdAndUpdate(id, updateDriverDto);
  }
}
