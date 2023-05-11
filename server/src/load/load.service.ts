import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ILoad } from './interfaces/index';
import { CreateLoadDto, UpdateLoadDto } from './dto/index';
import { LOAD_MODEL } from './constants/index';

@Injectable()
export class LoadService {
  constructor(
    @Inject(LOAD_MODEL)
    private loadModel: Model<ILoad>,
  ) {}

  async create(createLoadDto: CreateLoadDto): Promise<ILoad> {
    const created = new this.loadModel(createLoadDto);
    return created.save();
  }

  async findAll(): Promise<ILoad[]> {
    return this.loadModel.find();
  }

  async getByDriver(
    driverId: string,
    params?: { max: Date; min: Date },
  ): Promise<ILoad[]> {
    const query = { driverId };
    if (params?.max && params?.min) {
      Object.assign(query, {
        pickupDate: {
          $gte: params.min,
          $lte: params.max,
        },
      });
    }
    return this.loadModel.find(query);
  }

  async deleteOne(id: string): Promise<boolean> {
    return await this.loadModel.findByIdAndRemove(id);
  }

  async update(id: string, updateLoadDto: UpdateLoadDto): Promise<ILoad> {
    return await this.loadModel.findByIdAndUpdate(id, updateLoadDto);
  }
}
