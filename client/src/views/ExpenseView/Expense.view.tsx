import React, { useCallback } from 'react';
import {IExpense, IUpdateExpense} from '../../features/expense/interfaces';
import styled from 'styled-components';

interface IProps {
    expenseDetails: IExpense;
    handleChange: (expense: IExpense) => void
}
export const ExpenseView = (props: IProps) => {
    const { expenseDetails, handleChange } = props;
    const onChange = useCallback(({target}: any) => {
        handleChange({...expenseDetails, [target.name]: target.value})
    }, [expenseDetails, handleChange]);

    return (
        <React.Fragment>
        <UpdateExpenseContainer>
            <TopContainer>
                <RecordContainer>
                    <Label htmlFor="expense-title">Title </Label>
                    <Input id="expense-title" onChange={onChange} name="title" value={expenseDetails.title}/>
                </RecordContainer>
                <RecordContainer>
                    <Label htmlFor="expense-date">Expense Date </Label>
                    <Input  type="date" id="expense-date" onChange={onChange} name="expenseDate" value={expenseDetails.expenseDate.toString()?.split('T')[0]}/>
                </RecordContainer>
                </TopContainer>
            <TopContainer>
                <RecordContainer>
                    <Label htmlFor="expense-amount">Amount </Label>
                    <Input type="number" min={0}  id="expense-amount" onChange={onChange} name="amount" value={expenseDetails.amount}/>
                </RecordContainer>
                <RecordContainer>
                    <Label htmlFor="expense-description">Expense Description </Label>
                    <Input  id="expense-description" onChange={onChange} name="description" value={expenseDetails.description}/>
                </RecordContainer>
            </TopContainer>
            <TopContainer>
                <RecordContainer>
                    <Label htmlFor="driver-percentage">Driver Percentage </Label>
                    <Input min={0} max={100} type="number" id="driver-percentage" onChange={onChange} name="driverPercentage" value={expenseDetails.driverPercentage}/>
                </RecordContainer>
                <RecordContainer>
                    <Label style={{display: 'none'}} htmlFor="truck-percentage">Truck Percentage </Label>
                    <Input style={{display: 'none'}} />
                </RecordContainer>
            </TopContainer>
        </UpdateExpenseContainer>
        </React.Fragment>
    );
}

const RecordContainer = styled.div`
    display: block;
    margin: 20px 0px;
    width: 300px;
`

const TopContainer = styled.div`
    display: flex;
    justify-content: space-Around;
`;

const UpdateExpenseContainer = styled.div`
`;

const Input = styled.input`
    height: 30px;
    width: 100%;
    margin: auto;
    font-size: 18px;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid black;
`

const Label = styled.label`
    display: block;
    width: 85%;
    margin: 10px auto;
    text-align: left;
    font-weight: 600;
`;
