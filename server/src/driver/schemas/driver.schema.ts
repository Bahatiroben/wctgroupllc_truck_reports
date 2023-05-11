import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: String,
    address: String,
    email: String,
  },
  { timestamps: true },
);
