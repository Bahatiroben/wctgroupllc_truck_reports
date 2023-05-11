import * as mongoose from 'mongoose';

export const LoadSchema = new mongoose.Schema(
  {
    name: String,
    pickupDate: Date,
    pickupAddress: String,
    deliveryDate: Date,
    deliveryAddress: String,
    driverId: String,
    driverRate: Number,
    grossBeforeFees: String,
    grossAfterFees: String,
    driverGrossPay: String,
    truckGrossPay: String,
  },
  { timestamps: true },
);
