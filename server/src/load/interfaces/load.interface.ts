import { Document } from 'mongoose';

export interface ILoad extends Document {
  name: string;
  pickupDate: Date;
  pickupAddress: string;
  deliveryDate: Date;
  deliveryAddress: string;
  driverId: string;
  driverRate: number;
  grossBeforeFees: number;
}
