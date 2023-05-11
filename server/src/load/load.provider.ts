import { Connection } from 'mongoose';
import { LoadSchema } from './schemas/index';

export const loadProviders = [
  {
    provide: 'LOAD_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Load', LoadSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
