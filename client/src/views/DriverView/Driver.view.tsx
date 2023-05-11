import React, { useCallback } from 'react';
import {IDriver, IUpdateDriver} from '../../features/driver/interfaces';
import styled from 'styled-components';

interface IProps {
    driverDetails: IDriver;
    handleChange: (driver: IDriver) => void
}
export const DriverView = (props: IProps) => {
    const { driverDetails, handleChange } = props;
    const onChange = useCallback(({target}: any) => {
        handleChange({...driverDetails, [target.name]: target.value})
    }, [driverDetails, handleChange]);

    return (
        <React.Fragment>
            <UpdateDriverContainer>
                <TopContainer>
                    <RecordContainer>
                        <Label htmlFor="driver-name">Name </Label>
                        <Input id="driver-name" onChange={onChange} name="name" value={driverDetails.name}/>
                    </RecordContainer>
                    <RecordContainer>
                        <Label htmlFor="driver-phone">Phone </Label>
                        <Input  id="driver-phone" onChange={onChange} name="phoneNumber" value={driverDetails.phoneNumber}/>
                    </RecordContainer>
                </TopContainer>
                <TopContainer>
                    <RecordContainer>
                        <Label htmlFor="driver-address">Address </Label>
                        <Input  id="driver-address" onChange={onChange} name="address" value={driverDetails.address}/>
                    </RecordContainer>
                    <RecordContainer>
                        <Label htmlFor="driver-email">Email </Label>
                        <Input  id="driver-email" onChange={onChange} name="email" value={driverDetails.email}/>
                    </RecordContainer>
                </TopContainer>
            </UpdateDriverContainer>
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

const UpdateDriverContainer = styled.div`
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
