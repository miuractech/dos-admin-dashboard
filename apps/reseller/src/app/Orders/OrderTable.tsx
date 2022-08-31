import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import DataTable, { ExpanderComponentProps } from "react-data-table-component"
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Divider, Tooltip, Typography } from '@mui/material';
import { db } from '../../firebaseConfig/config';
import { RootState } from '../../redux-tool/store';
import { OrderDetailsType, setOrderDetails } from '../../redux-tool/orderSlice';

export const OrdersTable = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector((state: RootState) => state.orders)
    const { User } = useSelector((state: RootState) => state.User)

    const ExpandedComponent: React.FC<ExpanderComponentProps<OrderDetailsType>> = ({ data }) => {
        return <>
            {data.items.slice(1).map((item) => (
                <>
                    <div className='p-1 flex space-x-5'>
                        <div className='pl-24'>
                            <img src={item.img} alt={item.productName} className='w-16' />
                        </div>
                        <div className='flex space-x-5'>
                            <div className='w-52 self-center'>
                                <Tooltip title={item.productName} arrow>
                                    <Typography className='text-ellipsis overflow-hidden whitespace-nowrap'>{item.productName}</Typography>
                                </Tooltip>
                            </div>
                            <Typography className='self-center'>{item.size} / {item.count}</Typography>
                        </div>
                    </div>
                    <Divider />
                </>
            ))}
        </>
    };

    useEffect(() => {
        if (!User) return
        const ordersRef = collection(db, "reSellers", User.uid, "orders");
        const q = query(ordersRef, orderBy("timeStamp", "desc"), where("status", "==", "success"));
        const unsub = onSnapshot(q, (doc) => {
            const data = doc.docs.map(order => ({ ...order.data() }))
            console.log(data);
            const newData = data.map(item => {
                let disabled = true;
                if (item['items'].length > 1) {
                    disabled = false
                }
                return { ...item, disabled }
            })
            dispatch(setOrderDetails(newData));
        });
        return () => unsub()
    }, [])


    return (
        <DataTable
            columns={columns}
            data={orders}
            customStyles={customStyles}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            expandableRowDisabled={row => row.disabled}
            pagination
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
        cell: (data: OrderDetailsType) => <div>
            <Tooltip title={data.orderid} arrow>
                <img src={data.items[0].img} alt="img" className='w-16 cursor-pointer' />
            </Tooltip>
        </div>,
        grow: 0.4
    },
    {
        name: <Typography variant='h6'>Product</Typography>,
        cell: (data: OrderDetailsType) => <div className='w-full'>
            <Tooltip title={data.items[0].productName} arrow>
                <Typography className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.items[0].productName}</Typography>
            </Tooltip>
            {data.items.length > 1 && <Chip label={`+${data.items.length - 1}`} variant="outlined" size='small' />}
        </div>,
        grow: 1.5
    },
    {
        name: <Typography variant='h6'>Size/count</Typography>,
        cell: (data: OrderDetailsType) => <div >
            <Typography className='absolute left-5'>{data.items[0].size} / {data.items[0].count} </Typography>
        </div>,
    },
    {
        name: <Typography variant='h6'>Name</Typography>,
        cell: (data: OrderDetailsType) => <div className='w-full'>
            <Tooltip title={data.address.firstName} arrow>
                <Typography className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.address.firstName}</Typography>
            </Tooltip>
        </div>,
    },
    {
        name: <Typography variant='h6'>Phone</Typography>,
        cell: (data: OrderDetailsType) => <div>
            <Typography>{data.address.phone}</Typography>
        </div>,
    },
    {
        name: <Typography variant='h6'>Pincode</Typography>,
        cell: (data: OrderDetailsType) => <div>
            <Typography>{data.address.pincode}</Typography>
        </div>,
    },
    {
        name: <Typography variant='h6'>Order Time</Typography>,
        cell: (data: OrderDetailsType) => <div>
            <Typography className='text-green-600' fontWeight={500}>{data.profit}</Typography>
        </div>,
        grow: 1.2
    }
]
