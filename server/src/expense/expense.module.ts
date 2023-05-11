import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { expenseProviders } from './expense.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, ...expenseProviders],
})
export class ExpenseModule {}
