import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema(
  {
    title: String,
    expenseDate: Date,
    driverPercentage: Number,
    truckPercentage: Number,
    amount: Number,
    description: String,
    loadId: String,
    driverId: String,
  },
  { timestamps: true },
);
