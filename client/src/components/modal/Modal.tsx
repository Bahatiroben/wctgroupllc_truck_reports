import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import './modal.css';

export interface IModalProps {
    title: string;
    children: ReactNode;
    handleCancel: () => void;
    handleConfirm: () => void;
    hideButtons?: boolean;
    classes: {
        container: 'modal-full' | 'modal-medium' | 'modal-small' | 'modal-extra-large'
    }
}

export const ModalComponent = (props: IModalProps) => {
    const { handleCancel, handleConfirm, title, classes, hideButtons } = props;

    return (
    <ModalWrapper>
        <ModalContainer className={classes.container}>
            {title && <ModalTitle>{title}</ModalTitle>}
            <ModalBody>{props.children}</ModalBody>
            {!hideButtons &&
            <ModalFooter>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                <ConfirmButtom onClick={handleConfirm}>Confirm</ConfirmButtom>
            </ModalFooter>
            }
        </ModalContainer>
    </ModalWrapper>
    );
}

const ModalContainer = styled.div`
    position: relative;
    z-index: 99;
    background-color: rgba(255, 255, 255);
    top: calc(100vh/10);
    left: 0;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ModalWrapper = styled.div`
    position: absolute;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    z-index: 90;
    background-color: rgba(49,49,49, 0.6);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const ModalTitle = styled.h1`
    font-size: 25px;
    font-weight: 600;
`

const ModalBody = styled.div`
    font-size: 18px;
`

const ModalFooter = styled.div`
    display: flex;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 15px;
`

const ModalButton =  styled.button`
    &:hover {
        opacity: 0.8;
    }
    font-size: 18px;
    bodrer;
    border-radius: 20px;
    border: none;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    width: 8rem;
`

const ConfirmButtom = styled(ModalButton)`
    background-color: #6699CC; /* or blue  or green*/
`

const CancelButton = styled(ModalButton)`
    background-color: maroon;
`