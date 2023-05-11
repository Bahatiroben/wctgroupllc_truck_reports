import { AxiosInstance } from '../../config';
import { IExpense, IUpdateExpense} from './interfaces';

export const createExpenseAPI = async (ExpenseInfo: IExpense) => {
    const response = await AxiosInstance.post('/expense', ExpenseInfo);

    if(response.status === 201) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const getExpensesAPI = async () => {
    const response = await AxiosInstance.get('/expense');
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const updateExpenseAPI = async (ExpenseDetails: IUpdateExpense, id: string) => {
    const response = await AxiosInstance.patch(`/expense/${id}`, ExpenseDetails);
    if(response.status === 200) {
        return response.data;
} else {
        return {error:  'Error', response}
    }
}

export const deleteExpenseAPI = async (id: string) => {
    const response = await AxiosInstance.delete(`/expense/${id}`);
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}

export const getExpenseByLoadId = async (loadIds: string[]) => {
    const response = await AxiosInstance.get(`/expense/getByLoad?loadIds=${[loadIds]}`);
    if(response.status === 200) {
        return response.data;
    } else {
        return {error:  'Error', response}
    }
}