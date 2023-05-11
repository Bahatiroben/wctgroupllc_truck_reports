import { Document } from 'mongoose';

export interface IExpense extends Document {
  title: string;
  expenseDate: Date;
  driverPercentage: number;
  truckPercentage: number;
  amount: number;
  description: string;
  loadId: string;
  driverId: string;
}
