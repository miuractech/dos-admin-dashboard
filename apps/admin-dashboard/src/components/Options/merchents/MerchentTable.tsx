import { OrderDetailsType } from '../../../store/orderSlice';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import DataTable, { ExpanderComponentProps } from "react-data-table-component"
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../../config/firebase.config';
import { RootState } from '../../../store/index';
import { Chip, CircularProgress, Divider, Tooltip, Typography } from '@mui/material';
import { MerchentType, setMerchentDelatils } from '../../../store/merchentSlice';

export const MerchentTable = () => {
    const dispatch = useDispatch()
    const { merchents } = useSelector((state: RootState) => state.merchents)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const ordersRef = collection(firestore, "reSellers");
        const q = query(ordersRef, where("profileUrl", "!=", ""));
        const unsub = onSnapshot(q, (doc) => {
            const data = doc.docs.map(order => ({ ...order.data(), id: order.id }))
            console.log(data);
            setLoading(false)
            dispatch(setMerchentDelatils(data));
        });
        return () => unsub()
    }, [])


    return (
        <DataTable
            title="Merchents"
            columns={columns}
            data={merchents}
            customStyles={customStyles}
            pagination
            highlightOnHover
            pointerOnHover
            fixedHeader
            fixedHeaderScrollHeight="80vh"
            progressPending={loading}
            progressComponent={<CircularProgress />}
        />
    )
}

const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
};

const columns = [
    {
        cell: (data: MerchentType) => <div>
            <Tooltip title={data.storeName} arrow>
                <img src={data.bannerUrl} alt="img" className='w-16 cursor-pointer' />
            </Tooltip>
        </div>,
        grow: 0.4
    },
    {
        name: <Typography variant='caption'>Store Name</Typography>,
        cell: (data: MerchentType) => <div className='w-full'>
            <Tooltip title={data.storeName} arrow>
                <Typography variant='caption' className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.storeName}</Typography>
            </Tooltip>
        </div>
    },
    {
        name: <Typography variant='caption'>Full Name</Typography>,
        selector: (data: MerchentType) => data.fullName
    },
    {
        name: <Typography variant='caption'>Name</Typography>,
        cell: (data: MerchentType) => <div className='w-full'>
            <Tooltip title={data.phone} arrow>
                <Typography variant='caption' className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.phone}</Typography>
            </Tooltip>
        </div>
    },
    {
        name: <Typography variant='caption'>Phone</Typography>,
        selector: (data: MerchentType) => data.phone,
        sortable: true
    },
    {
        name: <Typography variant='caption'>Email</Typography>,
        selector: (data: MerchentType) => data.email,
        sortable: true
    },
    {
        name: <Typography variant='caption'>Link</Typography>,
        cell: (data: MerchentType) => {
            const url = `http://localhost:4200/shops/${data.id}`
             return <a href = { url } target = "_blank" rel = "noreferrer" > Link</a>
        },
        sortable: true
    },
]