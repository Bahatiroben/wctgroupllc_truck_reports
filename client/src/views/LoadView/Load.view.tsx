import React, { useCallback, Dispatch } from 'react';
import { ILoad, IUpdateLoad } from '../../features/load/interfaces';
import styled from 'styled-components';

interface IProps {
    loadDetails: ILoad;
    handleChange: (load: ILoad) => void
}

export const LoadView = (props: IProps) => {
    const { loadDetails, handleChange } = props;
    const onChange = useCallback(({target}: any) => {
        handleChange({...loadDetails, [target.name]: target.value})
    }, [loadDetails, handleChange]);

    return (
        <React.Fragment>
        <UpdateLoadContainer>
            <TopContainer>
                <RecordContainer>
                    <Label htmlFor="load-name">Name </Label>
                    <Input id="load-name" onChange={onChange} name="name" value={loadDetails.name}/>
                </RecordContainer>
                <RecordContainer>
                    <Label htmlFor="load-pickup-date">Pickup Date </Label>
                    <Input type='date'  id="load-pickup-date" onChange={onChange} name="pickupDate" value={loadDetails.pickupDate.toString()?.split('T')[0]}/>
                </RecordContainer>
                </TopContainer>
            <TopContainer>
                <RecordContainer>
                    <Label htmlFor="load-pickup-address">Pickup Address </Label>
                    <Input id="load-pickup-address" onChange={onChange} name="pickupAddress" value={loadDetails.pickupAddress}/>
                </RecordContainer>
                <RecordContainer>
                    <Label htmlFor="load-delivery-address">Delivery Address </Label>
                    <Input id="load-delivery-address" onChange={onChange} name="deliveryAddress" value={loadDetails.deliveryAddress}/>
                </RecordContainer>
                </TopContainer>
            <TopContainer>
                <RecordContainer>
                    <Label htmlFor="load-gross-before-fees">Gross Before Fees </Label>
                    <Input id="load-gross-before-fees" onChange={onChange} name="grossBeforeFees" value={loadDetails.grossBeforeFees}/>
                </RecordContainer>
                <RecordContainer>
                    <Label htmlFor="load-driver-rate">Driver Rate </Label>
                    <Input  id="load-driver-rate" onChange={onChange} name="driverRate" value={loadDetails.driverRate} />
                </RecordContainer>
            </TopContainer>
        </UpdateLoadContainer>
        </React.Fragment>
    );
};

const RecordContainer = styled.div`
    display: block;
    margin: 20px 0px;
    width: 300px;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const UpdateLoadContainer = styled.div`
`;

const Input = styled.input`
    height: 30px;
    width: 100%;
    margin: auto;
    font-size: 18px;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid black;
`;

const Label = styled.label`
    display: block;
    width: 85%;
    margin: 10px auto;
    text-align: left;
    font-weight: 600;
`;
