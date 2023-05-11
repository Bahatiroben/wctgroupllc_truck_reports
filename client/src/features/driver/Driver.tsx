import React, {Dispatch, useCallback, useEffect, useMemo, useState} from 'react';
import { TableComponent, IHeader, RowData, ModalComponent } from '../../components'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectDrivers,
    getAllDrivers,
    createDriver,
    deleteDriver,
    updateDriver
  } from './driverSlice';
import {camelCaseToWords} from '../../utils';
import styled from 'styled-components';
import { DriverView } from '../../views/DriverView';
import { IDriver } from './interfaces';
import { pick } from 'lodash';
import { Load } from '../load/Load';

interface IProps {
    setDriverId: React.Dispatch<React.SetStateAction<string>>;
    setCurrentEntity: React.Dispatch<React.SetStateAction<string>>
}

export const Driver = (props: IProps) => {
    const drivers: IDriver[] = useAppSelector(selectDrivers);
    const { setCurrentEntity, setDriverId } = props;

    const emptyDriver: IDriver = useMemo(() => ({
        name: '',
        address: '',
        phoneNumber: '',
        email: ''
    }), []);
    
    const dispatch = useAppDispatch();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<IDriver>(emptyDriver);

    const allKeys = useMemo(() => Object.keys(pick(drivers[0], ['name', 'address', 'email', 'phoneNumber']) || []), [drivers]);

    const headers: IHeader[] = useMemo(() => allKeys.map(keyName => ({
        caption: camelCaseToWords(keyName),
        keyName
    })), [allKeys]);

    const handleChange = useCallback((driver: IDriver) => {
        setSelectedDriver(driver);
    }, [setSelectedDriver])

    const handleModalOpen = useCallback((params: Record<string, string>) => {
        const driverId = params.entityId;
        const action = params.action;
        const selectedDriverValue: IDriver = drivers.find(driver => driver._id === driverId) as IDriver;
        setSelectedDriver(selectedDriverValue)
        if(action === 'delete') {
            setDeleteOpen(true);
        } else if(action === 'update') {
            setEditOpen(true);
        } else if(action === 'create') {
            setCreateOpen(true);
        }
    }, [drivers]);

    const handleForward = useCallback((params: Record<string, string>) => {
        const { entityId } = params;
        setDriverId(entityId);
        setCurrentEntity('load');
    }, [setCurrentEntity, setDriverId]);

    const handleConfirmDelete = useCallback(async () => {
        const response = await dispatch(deleteDriver(selectedDriver._id as string));
        console.log(response)
        if(!response?.payload?.error) {
            dispatch(getAllDrivers());
        }
        setDeleteOpen(false);
    }, [dispatch, selectedDriver._id]);

    const handleConfirmEdit = useCallback(async () => {
        const response  = await dispatch(updateDriver(selectedDriver));
        if(!response?.payload?.error) {
            dispatch(getAllDrivers());
        }
        setEditOpen(false);
    }, [dispatch, selectedDriver]);

    const handleConfirmCreate = useCallback(async () => {
        const response  = await dispatch(createDriver(selectedDriver));
        if(!response?.payload?.error) {
            dispatch(getAllDrivers());
        }
        setCreateOpen(false);
        setSelectedDriver(emptyDriver)
    }, [dispatch, emptyDriver, selectedDriver])

    const handleCancel = useCallback(() => {
        setEditOpen(false);
        setDeleteOpen(false);
        setCreateOpen(false);
        setSelectedDriver(emptyDriver);
    }, [setEditOpen, setDeleteOpen, emptyDriver]);

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
        dispatch(getAllDrivers())
    }, [dispatch]);

    useEffect(() => {
        if(editOpen || deleteOpen) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
    })

    return (
        <DriverContainer>
                    { deleteOpen && 
            <ModalComponent {
                ...{
                    ...modalProps,
                    title: `Delete Driver (${selectedDriver.name})`,
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
                        title: 'Update Driver',
                        handleConfirm: handleConfirmEdit
                    }
                }>
                <DriverView 
                    driverDetails={selectedDriver}
                    handleChange={handleChange}
                    />
                <Load driverId={selectedDriver._id as string}/>
            </ModalComponent>

        }
        { createOpen && 
            <ModalComponent {
                ...{
                    ...modalProps,
                        title: 'Create Driver',
                        handleConfirm: handleConfirmCreate
                    }
                }>
                <DriverView 
                    driverDetails={selectedDriver}
                    handleChange={handleChange}
                    />
            </ModalComponent>
        }
            <TopBar>
                <CreateButton onClick={handleCreate}>
                    Create Driver
                </CreateButton>
            </TopBar>
            <TableComponent
                headers={headers}
                rows={drivers}
                handleEdit={handleModalOpen}
                handleDelete={handleModalOpen}
                handleForward={handleForward}
            />
        </DriverContainer>
    );
}

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: auto;
`;

const DriverContainer = styled.div`
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