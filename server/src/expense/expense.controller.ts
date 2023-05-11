import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Delete,
  Param,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/index';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    const resp = await this.expenseService.create(createExpenseDto);
    return response.status(HttpStatus.CREATED).json(resp);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const resp = await this.expenseService.findAll();
    return response.status(HttpStatus.OK).json(resp);
  }

  @Get('/getByLoad')
  async findByLoadIds(
    @Res() response: Response,
    @Query() params: { loadIds: string },
  ) {
    const expenses = await this.expenseService.getByLoadIds(
      params.loadIds.split(','),
    );
    return response.status(HttpStatus.OK).json(expenses);
  }

  @Delete('/:expenseId')
  async delete(
    @Res() response: Response,
    @Param() params: { expenseId: string },
  ) {
    const resp = await this.expenseService.deleteOne(params.expenseId);
    return response.status(HttpStatus.OK).json(resp);
  }

  @Patch('/:expenseId')
  async update(
    @Res() response: Response,
    @Body() expenseDetails: UpdateExpenseDto,
    @Param() params: { expenseId: string },
  ) {
    const resp = await this.expenseService.update(
      params.expenseId,
      expenseDetails,
    );
    return response.status(HttpStatus.OK).json(resp);
  }
}
