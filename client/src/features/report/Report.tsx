import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ILoad } from '../load/interfaces';
import { IExpense } from '../expense/interfaces';
import styled from 'styled-components';
import { pick } from 'lodash';
import { camelCaseToWords } from '../../utils';
import { IHeader, TableComponent } from '../../components';
import { selectDrivers } from '../driver/driverSlice';
import { useAppSelector } from '../../app/hooks';
import { IDriver } from '../driver/interfaces';
import { FaFileDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';


interface IReport {
    loads: ILoad[],
    expenses: IExpense[];
    fromDate: Date;
    toDate: Date;
    driverId: string;
    handleCancel: () => void;
};


export const ReportComponent = (props: IReport) => {
    const { expenses, loads, fromDate, toDate, driverId, handleCancel } = props;
    const drivers: IDriver[] = useAppSelector(selectDrivers);
    const reportTemplateRef = useRef(null);
    const driver = useMemo(() => 
        drivers.find(entry =>  entry._id === driverId)
    , [driverId, drivers])

    const expenseKeys = useMemo(() => expenses && Object.keys(
        pick(expenses[0], 
            ['title', 'expenseDate', 'driverPercentage', 'truckPercentage', 'amount', 'description'])),
     [expenses]);

    const loadKeys = useMemo( () =>
        loads && Object.keys(
            pick(loads[0], 
                ['name', 'pickupDate', 'pickupAddress', 'deliveryDate', 'deliveryAddress', 'grossBeforeFees', 'grossAfterFees', 'driverGrossPay', 'truckGrossPay', 'driverRate'])), []) 
            ;
    const loadHeaders: IHeader[] = useMemo(() => loadKeys.map(keyName => ({
        caption: camelCaseToWords(keyName),
        keyName
    })), [loadKeys]);

    const expenseHeaders: IHeader[] = useMemo(() => expenseKeys.map(keyName => ({
        caption: camelCaseToWords(keyName),
        keyName
    })), [expenseKeys]);


    let totalGrossBeforeFees = 0;
    let totalGrossAfterFees = 0;
    let totalDriverGrossPay = 0;
    let totalTruckGrossPay = 0;
    loads.forEach(entry => {
        totalGrossBeforeFees += Number(entry.grossBeforeFees)
        totalGrossAfterFees += Number(entry.grossAfterFees)
        totalDriverGrossPay += Number(entry.driverGrossPay)
        totalTruckGrossPay += Number(entry.truckGrossPay)
    });

    let totalTruckExpenses = 0;
    let totalDriverExpenses = 0;
    let totalExpenses = 0;

    expenses.forEach(entry => {
        totalTruckExpenses += entry.amount * entry.truckPercentage / 100;
        totalDriverExpenses += entry.amount * entry.driverPercentage / 100;
        totalExpenses += entry.amount;
    });

    const driverNetPay = totalDriverGrossPay - totalDriverExpenses;
    const truckNetPay = totalTruckGrossPay - totalTruckExpenses;

    const YTDAmount = totalGrossAfterFees - totalExpenses - driverNetPay + truckNetPay;

    const sumaryHeaders = [
        {
            caption: 'Title',
            keyName: 'title'
        },
        {
        caption: 'Amount',
        keyName: 'amount'
    },
]

    const summaryRows = [
        {title: 'Total Gross After Fees', amount: totalGrossAfterFees},
        {title: 'Operation Expenses', amount: totalExpenses * -1},
        {title: 'Driver Net Pay', amount: driverNetPay * -1},
        {title: 'Truck Net Pay', amount: truckNetPay},
        {title: 'YTD Amount up to date', amount: YTDAmount},
    ]

	const handleGeneratePdf = () => {
		const doc = new jsPDF({
			format: 'a4',
            orientation: 'p',
			unit: 'pt',
		});

		// Adding the fonts.
		doc.setFont('Inter-Regular', 'normal');
        const width = doc.internal.pageSize.getWidth();
		doc.html(reportTemplateRef.current as unknown as string, {
            width: 794,
            windowWidth: 794,
            margin: [30, 20, 30, 50],
            html2canvas: { scale: 0.6 }
		}).then(() => {
            doc.save('document.pdf');
        });
	};

    return (
        <ReportContainer>
            <ButtonsContainer>
                <CloseButton onClick={handleCancel}>Close</CloseButton>
                <DownloadButton onClick={handleGeneratePdf}>Download <DownloadButtonIcon/></DownloadButton>
            </ButtonsContainer>
            <div ref={reportTemplateRef}>
            <ReportHead>
                <ReportTitle>World Class Transportation Group</ReportTitle>
                <Typography>
                    <BoldSpan>Driver: </BoldSpan>{driver?.name}
                </Typography>
                <Typography>
                    <BoldSpan>From Date: </BoldSpan>{fromDate.toString()}<BoldSpan> &nbsp;To Date</BoldSpan>{toDate.toString()}
                </Typography>
            </ReportHead>
            { loadHeaders[0] &&
                <Typography>
                <ReportTableTitle>Loads</ReportTableTitle>
                <TableComponent
                    headers={loadHeaders}
                    rows={[...loads, {
                        grossBeforeFees: Math.round(totalGrossBeforeFees),
                        grossAfterFees: Math.round(totalGrossAfterFees),
                        driverGrossPay: Math.round(totalDriverGrossPay),
                        truckGrossPay: Math.round(totalTruckGrossPay),
                        _id: '2',
                        name: '',
                        pickupDate: '',
                        pickupAddress: '',
                        deliveryDate: '',
                        deliveryAddress: '',
                        driverId: '',
                        driverRate: '',
                    }]}
                    hideActions={true}
                    handleEdit={() => null}
                    handleDelete={() => null}
                    handleForward={() => null}
                />
                </Typography>
            }
            { expenseHeaders[0] &&
                <Typography>
                    <ReportTableTitle>Expenses</ReportTableTitle>
                <TableComponent
                    headers={expenseHeaders}
                    rows={[...expenses, {
                        _id: '1',
                        title: '',
                        expenseDate: '',
                        driverPercentage: Math.round(totalDriverExpenses),
                        truckPercentage: Math.round(totalTruckExpenses),
                        amount: Math.round(totalExpenses),
                        description: 'Total',
                        loadId: '',
                        driverId: ''
                    }]}
                    hideActions={true}
                    handleEdit={() => null}
                    handleDelete={() => null}
                    handleForward={() => null}
                />
                </Typography>
            }
            { expenseHeaders[0] &&
                <Typography>
                    <ReportTableTitle>Sumary</ReportTableTitle>
                <TableComponent
                    headers={sumaryHeaders}
                    rows={summaryRows}
                    hideActions={true}
                    handleEdit={() => null}
                    handleDelete={() => null}
                    handleForward={() => null}
                />
                </Typography>
            }
        </div>
        </ReportContainer>

    )
};

const ReportContainer = styled.div`
    margin: 50px auto;
`;

const ReportHead = styled.div`
margin-bottom: 20px;`;

const ReportTitle = styled.h2`

`;

const Typography = styled.div``;

const ReportTableTitle = styled.div`
    margin: 50px 0px 20px 0px;
`;

const BoldSpan = styled.span`
    font-weight: 600;
`;

const ButtonsContainer = styled.div`
margin: 20px auto;
width: 90%;
display: flex;
justify-content: space-between;
`;

const DownloadButtonIcon = styled(FaFileDownload)`
`
const CloseButton = styled.button`
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
    background-color: maroon;
`

const DownloadButton = styled.button`
    &:hover {
        opacity: 0.8;
        background-color: maroon;
        color: white;
    }
    font-size: 18px;
    bodrer;
    border-radius: 20px;
    border: 1px solid maroon;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    color: maroon;
    background-color: white;
`;