import { Connection } from 'mongoose';
import { ExpenseSchema } from './schemas/index';

export const expenseProviders = [
  {
    provide: 'EXPENSE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Expense', ExpenseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
