import React, {Dispatch, useCallback, useEffect, useMemo, useState} from 'react';
import { TableComponent, IHeader, RowData, ModalComponent } from '../../components'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectExpenses,
    getExpensesByLoad,
    createExpense,
    deleteExpense,
    updateExpense
  } from './expenseSlice';
import {camelCaseToWords} from '../../utils';
import styled from 'styled-components';
import { ExpenseView } from '../../views/ExpenseView';
import { IExpense } from './interfaces';
import { omit, pick } from 'lodash';

interface IProps {
    loadId: string;
    driverId: string;
}

export const Expense = (props: IProps) => {
    const { loadId, driverId } = props;
    const expenses: IExpense[] = useAppSelector(selectExpenses);

    const emptyExpense: IExpense = useMemo(() => ({
        _id: '',
        title: '',
        expenseDate: new Date(),
        driverPercentage: 0,
        truckPercentage: 0,
        amount: 0,
        description: '',
        loadId: '',
        driverId: ''
    }), []);

    const calculateExpenseRates = useCallback((expense: IExpense): IExpense => {
        return {...expense, truckPercentage: 100 - expense.driverPercentage}
    }, [])
    
    const dispatch = useAppDispatch();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<IExpense>(emptyExpense);

    const allKeys = useMemo(() => Object.keys(pick(expenses[0], ['title', 'expenseDate', 'driverPercentage', 'truckPercentage', 'amount', 'description']) || []), [expenses]);

    const headers: IHeader[] = useMemo(() => allKeys.map(keyName => ({
        caption: camelCaseToWords(keyName),
        keyName
    })), [allKeys]);

    const handleChange = useCallback((expense: IExpense) => {
        setSelectedExpense(expense);
    }, [setSelectedExpense])

    const handleModalOpen = useCallback((params: Record<string, string>) => {
        const expenseId = params.entityId;
        const action = params.action;
        const selectedExpenseValue: IExpense = expenses.find(expense => expense._id === expenseId) as IExpense;
        setSelectedExpense(selectedExpenseValue)
        if(action === 'delete') {
            setDeleteOpen(true);
        } else if(action === 'update') {
            setEditOpen(true);
        } else if(action === 'create') {
            setCreateOpen(true);
        }
    }, [expenses]);

    const handleConfirmDelete = useCallback(async () => {
        const response = await dispatch(deleteExpense(selectedExpense._id as string));
        console.log(response)
        if(!response?.payload?.error) {
            dispatch(getExpensesByLoad([loadId]));
        }
        setDeleteOpen(false);
        setSelectedExpense(emptyExpense)
    }, [dispatch, emptyExpense, loadId, selectedExpense._id]);

    const handleConfirmEdit = useCallback(async () => {
        const calculatedExpense = calculateExpenseRates(selectedExpense);
        const response  = await dispatch(updateExpense({...calculatedExpense, expenseId: selectedExpense._id as string}));
        if(!response?.payload?.error) {
            dispatch(getExpensesByLoad([loadId]));
        }
        setEditOpen(false);
        setSelectedExpense(emptyExpense)
    }, [calculateExpenseRates, dispatch, emptyExpense, loadId, selectedExpense]);

    const handleConfirmCreate = useCallback(async () => {
        const calculatedExpense = calculateExpenseRates(selectedExpense);
        const response  = await dispatch(createExpense({...omit(calculatedExpense, '_id'), driverId: driverId as string, loadId}));
        if(!response?.payload?.error) {
            dispatch(getExpensesByLoad([loadId]));
        }
        setCreateOpen(false);
        setSelectedExpense(emptyExpense)
    }, [calculateExpenseRates, dispatch, driverId, emptyExpense, loadId, selectedExpense])

    const handleCancel = useCallback(() => {
        setEditOpen(false);
        setDeleteOpen(false);
        setCreateOpen(false);
        setSelectedExpense(emptyExpense)
    }, [emptyExpense]);

    const handleCreate = useCallback(() => {
        setCreateOpen(true);
    }, []);

    const className : 'modal-full' | 'modal-medium' | 'modal-small' = 'modal-full';

    const modalProps =  {
        handleCancel,
        classes: {
            container: className //| 'modal-medium' | 'modal-small'
        }
    }

    useEffect(() => {
        dispatch(getExpensesByLoad([loadId]))
    }, [dispatch, loadId]);

    useEffect(() => {
        if(editOpen || deleteOpen) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
    })

    return (
        <ExpenseContainer>
                    { deleteOpen && 
            <ModalComponent {
                ...{
                    ...modalProps,
                    title: `Delete Expense (${selectedExpense.title})`,
                    handleConfirm: handleConfirmDelete
                }
            }>
                Are you sure you want to continue? This operation might be irreversible
            </ModalComponent>
        }
        { editOpen && 
            <ModalComponent {
                ...{
                    ...modalProps,
                        title: 'Update Expense',
                        handleConfirm: handleConfirmEdit
                    }
                }>
                <ExpenseView 
                    expenseDetails={selectedExpense}
                    handleChange={handleChange}
                    />
            </ModalComponent>
        }
        { createOpen && 
            <ModalComponent {
                ...{
                    ...modalProps,
                        title: 'Add Expense',
                        handleConfirm: handleConfirmCreate
                    }
                }>
                <ExpenseView 
                    expenseDetails={selectedExpense}
                    handleChange={handleChange}
                    />
            </ModalComponent>
        }
            <TopBar>
                <CreateButton onClick={handleCreate}>
                    Create Expense
                </CreateButton>
            </TopBar>
            <TableComponent
                headers={headers}
                rows={expenses}
                handleEdit={handleModalOpen}
                handleDelete={handleModalOpen}
                handleForward={() => null}
            />
        </ExpenseContainer>
    );
}

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: auto;
`;

const ExpenseContainer = styled.div`
`

const CreateButton = styled.button`
    &:hover {
        opacity: 0.8;
    }
    font-size: 18px;
    border-radius: 10px;
    border: none;
    color: white;
    cursor: pointer;
    width: 8rem;
    height: 3rem;
    background-color: #6699CC; /* or blue  or green*/
    top: 0;
    left: calc(100vw/2.5);
    margin: 15px 0px;
`;