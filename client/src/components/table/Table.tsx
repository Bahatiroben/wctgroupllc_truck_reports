import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaTrashAlt, FaForward } from 'react-icons/fa';

export interface IHeader {
    caption: string;
    keyName: string;
}

export type RowData<T extends IHeader[]> = Record<string, any> & { [K in T[any]['keyName']]: any };

interface IProps {
    rows: Record<string, any>[];
    headers: IHeader[];
    hideActions?: boolean;
    handleDelete: (params: Record<string, string>) => void;
    handleEdit: (params: Record<string, string>) => void;
    handleForward: (params: Record<string, string>) => void;
}

export const TableComponent = (props: IProps) => {
        const { headers, rows: data, handleDelete, handleEdit, handleForward, hideActions} = props;

        type Headers = typeof headers;

        type Row = RowData<Headers>;

        const rows: Row[] = data;
    return (
    <div>
        <Table>
            <TableHeader>
                <TableRow>
                    {headers.map(entry => <TableHead key={entry.keyName}>{entry.caption}</TableHead>)}
                    {!hideActions && <TableHead>Actions</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    rows.map(row => {
                        return(<TableRow key={row._id}>
                            {
                                headers.map((header, index) => <TableData key={index}>{row[header.keyName]}</TableData>)
                            }
                            { !hideActions && <TableData>
                                    <ActionsContainer>
                                        <EditIcon onClick={() => {handleEdit({entityId: row._id, action: 'update'})}}/>
                                        <TrashIcon onClick={() => handleDelete({entityId: row._id, action: 'delete'})}/>
                                        <ForwardIcon onClick={() => handleForward({entityId: row._id, action: 'more'})} />
                                    </ActionsContainer>
                                </TableData>
                            }
                        </TableRow>)
                    })
                }
            </TableBody>
        </Table>
    </div>
    )
}

const Table = styled.table`
    width: 90%;
    margin: auto;
    border-collapse: collapse;
    font-family: Arial, Helvetica, sans-serif;
    background-color: whitesmoke;
    &:first-child {
        border-top-left-radius: 10px;
    }

    &:last-child {
        border-top-right-radius: 10px;
    }
`
const TableRow = styled.tr`
    height: 40px;
    border-bottom: solid silver;
    border-width: 1px 0;
    &:hover {
        background-color: #6699CC;
    }
`
const TableData = styled.td`    
    text-align: center;
`
const TableHeader = styled.thead`
    background-color: #6699CC;
    height: 40px;
    width: 100%;
`
const TableHead = styled.th`
    background-color: #6699CC;
    text-align: center;
    &:first-child {
        border-top-left-radius: 10px;
    }

    border-right: 2px solid whitesmoke;

    &:last-child {
        border-top-right-radius: 10px;
        border-right: none;
    }
`
const TableBody = styled.tbody`
`
const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
const iconsStyles = `
&:hover {
    cursor: pointer;
    color: #E6E6FA;
}
`
const EditIcon = styled(FaPencilAlt)`
${iconsStyles}
`

const TrashIcon = styled(FaTrashAlt)`
${iconsStyles}
`

const ForwardIcon = styled(FaForward)`
${iconsStyles}
`