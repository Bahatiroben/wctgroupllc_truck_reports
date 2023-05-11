import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { LoadModule } from './load/load.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [DriverModule, LoadModule, ExpenseModule],
})
export class AppModule {}
