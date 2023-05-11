import { Document } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
}
