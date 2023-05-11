import { Connection } from 'mongoose';
import { DriverSchema } from './schemas/index';
import { DRIVER_MODEL, DATABASE_CONNECTION } from './constants/index';

export const driverProviders = [
  {
    provide: DRIVER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Driver', DriverSchema),
    inject: [DATABASE_CONNECTION],
  },
];
