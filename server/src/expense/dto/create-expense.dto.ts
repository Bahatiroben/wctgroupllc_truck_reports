export class CreateExpenseDto {
  title: string;
  expenseDate: Date;
  driverPercentage: number;
  truckPercentage: number;
  amount: number;
  description: string;
  loadId: string;
  driverId: string;
}
