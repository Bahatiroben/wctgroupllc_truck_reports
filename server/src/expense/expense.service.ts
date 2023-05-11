import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IExpense } from './interfaces/index';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/index';
import { EXPENSE_MODEL } from './constants/index';

@Injectable()
export class ExpenseService {
  constructor(
    @Inject(EXPENSE_MODEL)
    private expenseModel: Model<IExpense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<IExpense> {
    const created = new this.expenseModel(createExpenseDto);
    return created.save();
  }

  async findAll(): Promise<IExpense[]> {
    return this.expenseModel.find();
  }

  async deleteOne(id: string): Promise<boolean> {
    return await this.expenseModel.findByIdAndRemove(id);
  }

  async getByLoadIds(loadIds: string[]): Promise<IExpense[]> {
    return this.expenseModel.find({
      loadId: {
        $in: loadIds,
      },
    });
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<IExpense> {
    return await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto);
  }
}
