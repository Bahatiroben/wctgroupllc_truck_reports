import React, {Dispatch, useCallback, useEffect, useMemo, useState} from 'react';
import { TableComponent, IHeader, RowData, ModalComponent } from '../../components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectLoads,
    getLoadsByDriver,
    createLoad,
    deleteLoad,
    updateLoad
  } from './loadSlice';
import { ReportComponent } from '../report/Report';
import {camelCaseToWords} from '../../utils';
import styled from 'styled-components';
import { LoadView } from '../../views/LoadView';
import { ILoad } from './interfaces';
import { omit, pick } from 'lodash';
import { Expense } from '../expense/Expense';
import { getExpensesByLoad, selectExpenses } from '../expense/expenseSlice';
import { IExpense } from '../expense/interfaces';

interface IProps {
    driverId: string;
}

export const Load = (props: IProps) => {

    const { driverId } = props;

    const emptyLoad: ILoad = useMemo(() => ({
        _id: '',
        name: '',
        pickupDate: new Date(),
        pickupAddress: '',
        deliveryDate: new Date(),
        deliveryAddress: '',
        driverId: '',
        driverRate: 0,
        grossBeforeFees: 0,
        truckGrossPay: 0,
        driverGrossPay: 0,
        grossAfterFees: 0
    }), []);

    const allLoads: ILoad[] = useAppSelector(selectLoads);
    const [displayReport, setDisplayReport] = useState(false);
    const expenses: IExpense[] = useAppSelector(selectExpenses);
    
    const loads = useMemo(() => allLoads.filter(entry => entry.driverId === driverId), [allLoads, driverId]);


    
    const dispatch = useAppDispatch();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [selectedLoad, setSelectedLoad] = useState<ILoad>(emptyLoad);
    const [min, setMin] = useState(new Date());
    const [max, setMax] = useState(new Date());
    const fixedRate  = useMemo(() => 100 - 12, []);

    const loadExpenses = useMemo(() => expenses.filter(expense => {
        return loads.some(load => load._id === expense.loadId)
    }), [expenses, loads]);

    useEffect(() => {
        dispatch(getExpensesByLoad(loads.map(entry => entry._id) as string[]))
    }, [dispatch, loads]);

    const allKeys = useMemo(() => Object.keys(pick(loads[0], ['name', 'pickupDate', 'pickupAddress', 'deliveryDate', 'deliveryAddress', 'grossBeforeFees', 'grossAfterFees', 'driverGrossPay', 'truckGrossPay', 'driverRate']) || []), [loads]);

    const headers: IHeader[] = useMemo(() => allKeys.map(keyName => ({
        caption: camelCaseToWords(keyName),
        keyName
    })), [allKeys]);

    const handleChange = useCallback((load: ILoad) => {
        setSelectedLoad(load);
    }, [setSelectedLoad])

    const handleModalOpen = useCallback((params: Record<string, string>) => {
        const loadId = params.entityId;
        const action = params.action;
        const selectedLoadValue: ILoad = loads.find(load => load._id === loadId) as ILoad;
        setSelectedLoad(selectedLoadValue)
        if(action === 'delete') {
            setDeleteOpen(true);
        } else if(action === 'update') {
            setEditOpen(true);
        } else if(action === 'create') {
            setCreateOpen(true);
        }
    }, [loads]);

    const handleForward = useCallback((params: Record<string, string>) => {
        const { entityId } = params;
        // setDriverId(entityId);
        // setCurrentEntity('load');
    }, []);

    const calculateLoadDetails = useCallback((load: ILoad) => {
        const grossAfterFees = Math.round(load.grossBeforeFees * fixedRate / 100) // fixed rate is 12% at the moment
        const driverGrossPay = Math.round(grossAfterFees * load.driverRate / 100)
        const truckGrossPay = grossAfterFees - driverGrossPay
        return ({...load, grossAfterFees, driverGrossPay, truckGrossPay})
    }, [fixedRate])

    const handleConfirmDelete = useCallback(async () => {
        const response = await dispatch(deleteLoad(selectedLoad._id as string));
        console.log(response)
        if(!response?.payload?.error) {
            dispatch(getLoadsByDriver({driverId, params: {min, max}}));
        }
        setDeleteOpen(false);
    }, [dispatch, driverId, max, min, selectedLoad._id]);

    const handleConfirmEdit = useCallback(async () => {
        const response  = await dispatch(updateLoad(calculateLoadDetails(selectedLoad)));
        if(!response?.payload?.error) {
            dispatch(getLoadsByDriver({driverId, params: {min, max}}));
        }
        setEditOpen(false);
        setSelectedLoad(emptyLoad)
    }, [calculateLoadDetails, dispatch, driverId, emptyLoad, max, min, selectedLoad]);

    const handleConfirmCreate = useCallback(async () => {
        const response  = await dispatch(createLoad({...omit(calculateLoadDetails(selectedLoad), '_id'), driverId}));
        if(!response?.payload?.error) {
            dispatch(getLoadsByDriver({driverId, params: {min, max}}));
        }
        setCreateOpen(false);
        setSelectedLoad(emptyLoad)
    }, [calculateLoadDetails, dispatch, driverId, emptyLoad, max, min, selectedLoad])

    const handleCancel = useCallback(() => {
        setEditOpen(false);
        setDeleteOpen(false);
        setCreateOpen(false);
        setSelectedLoad(emptyLoad);
    }, [emptyLoad]);

    const handleCreate = useCallback(() => {
        setCreateOpen(true);
    }, []);

    const className : 'modal-full' | 'modal-medium' | 'modal-small' | 'modal-extra-large' = 'modal-full';
    const reportClassName: 'modal-full' | 'modal-medium' | 'modal-small' | 'modal-extra-large' = 'modal-extra-large'

    const modalProps =  {
        handleCancel,
        classes: {
            container: className //| 'modal-medium' | 'modal-small'
        }
    }

    const handleGenerateReport = useCallback(() => {
        if(loadExpenses[0] && loads[0]) {
            setDisplayReport(true)
        } 
    }, [loadExpenses, loads])

    useEffect(() => {
        dispatch(getLoadsByDriver({driverId, params: {min, max}}))
    }, [dispatch, driverId, max, min]);

    useEffect(() => {
        if(editOpen || deleteOpen) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
    })

    return (
        <LoadContainer>
                    { deleteOpen && 
            <ModalComponent {
                ...{
                    ...modalProps,
                    title: `Delete Load (${selectedLoad.name})`,
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
                        title: 'Update Load',
                        handleConfirm: handleConfirmEdit
                    }
                }>
                <LoadView 
                    loadDetails={selectedLoad}
                    handleChange={handleChange}
                    />
                <Expense loadId={selectedLoad._id as string} driverId={driverId}/>
            </ModalComponent>
        }
        { createOpen && 
            <ModalComponent {
                ...{
                    ...modalProps,
                        title: 'Create Load',
                        handleConfirm: handleConfirmCreate
                    }
                }>
                <LoadView 
                    loadDetails={selectedLoad}
                    handleChange={handleChange}
                    />
            </ModalComponent>
        }
        { displayReport && 
            <ModalComponent {
                ...{
                    ...modalProps,
                        classes: {
                            container: reportClassName
                        },
                        title: '',
                        handleConfirm: handleConfirmCreate,
                        handleCancel: () => setDisplayReport(false),
                        hideButtons: true,
                    }
                }>
                <ReportComponent 
                    loads={loads}
                    expenses={loadExpenses}
                    fromDate={min}
                    toDate={max}
                    driverId={driverId}
                    handleCancel={() => setDisplayReport(false)}
                />
            </ModalComponent>
        }
            <TopBar>
                <SearchSection>
                    <SearchInputContainer>
                        <Label htmlFor="min-date">Min Date</Label>
                        <SearchInput id="expense-amount" onChange={(e) => setMin(e.target.value as unknown as Date)} placeholder='Min' value={min.toString()} type="date"/>
                    </SearchInputContainer>
                    <SearchInputContainer>
                        <Label htmlFor="max-date">Max Date</Label>
                        <SearchInput onChange={(e) => setMax(e.target.value as unknown as Date)} placeholder='Max' value={max.toString()} type="date"/>
                    </SearchInputContainer>
                    <CreateButton onClick={handleGenerateReport}>Generate Report</CreateButton>
                </SearchSection>
                <CreateButton onClick={handleCreate}>
                    Add Load
                </CreateButton>
            </TopBar>
            <TableComponent
                headers={headers}
                rows={loads}
                handleEdit={handleModalOpen}
                handleDelete={handleModalOpen}
                handleForward={handleForward}
            />
        </LoadContainer>
    );
}

const LoadContainer = styled.div`
`;

const Label = styled.label`
    display: block;
    width: 85%;
    margin: 0px 0px 7px 0px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
`;

const SearchInputContainer = styled.div`
`

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: auto;
`;

const SearchSection = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
`

const SearchInput = styled.input`
    height: 35px;
    font-size: 16px;
    border: 1px solid black; 
    border-radius: 5px;
    padding: 2px 5px;
`;

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