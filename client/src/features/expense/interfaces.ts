export interface IExpense  {
    _id?: string;
    title: string;
    expenseDate: Date;
    driverPercentage: number;
    truckPercentage: number;
    amount: number;
    description: string;
    loadId: string;
    driverId: string;
  }
  
export interface IUpdateExpense {
    title?: string;
    expenseDate?: Date;
    driverPercentage?: number;
    amount?: number;
    description?: string;
}