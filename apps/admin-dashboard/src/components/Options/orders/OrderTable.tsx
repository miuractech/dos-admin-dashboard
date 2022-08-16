import { OrderDetailsType, setOrderDetails } from '../../../store/orderSlice';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import DataTable, { ExpanderComponentProps } from "react-data-table-component"
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../../config/firebase.config';
import { RootState } from '../../../store/index';
import { Chip, CircularProgress, Divider, Tooltip, Typography } from '@mui/material';

export const OrderTable = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector((state: RootState) => state.orders)
    const [loading, setLoading] = useState(false)
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
                                <Typography variant='caption' className='text-ellipsis overflow-hidden whitespace-nowrap'>{item.productName}</Typography>
                                </Tooltip>
                            </div>
                            <Typography variant='caption' className='self-center'>{item.size} / {item.count}</Typography>
                        </div>
                    </div>
                    <Divider />
                </>
            ))}
        </>
    };

    useEffect(() => {
        setLoading(true)
        const ordersRef = collection(firestore, "orders");
        const q = query(ordersRef, where("status", "==", "success"));
        const unsub = onSnapshot(q, (doc) => {
            const data = doc.docs.map(order => ({ ...order.data() }))
            setLoading(false)
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
            title="Orders"
            columns={columns}
            data={orders}
            customStyles={customStyles}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            expandableRowDisabled={row => row.disabled}
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
        cell: (data: OrderDetailsType) => <div>
            <Tooltip title={data.orderid} arrow>
            <img src={data.items[0].img} alt="img" className='w-16 cursor-pointer' />
            </Tooltip>
        </div>,
        grow: 0.4
    },
    {
        name: <Typography variant='caption'>Product</Typography>,
        cell: (data: OrderDetailsType) => <div className='w-full'>
            <Tooltip title={data.items[0].productName} arrow>
            <Typography variant='caption' className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.items[0].productName}</Typography>
            </Tooltip>
            <br/>
            {data.items.length > 1 && <Chip label={`+${data.items.length - 1}`} variant="outlined" size='small' />}
        </div>,
        grow: 1.5
    },
    {
        name: <Typography variant='caption'>Size/count</Typography>,
        selector: (data: OrderDetailsType) =>data.items[0].size +"/"+data.items[0].count
    },
    {
        name: <Typography variant='caption'>Name</Typography>,
        cell: (data: OrderDetailsType) => <div className='w-full'>
            <Tooltip title={data.address.firstName} arrow>
                <Typography variant='caption' className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.address.firstName}</Typography>
            </Tooltip>
        </div>
    },
    {
        name: <Typography variant='caption'>Phone</Typography>,
        selector: (data: OrderDetailsType) => data.address.phone,
        sortable: true
    },
    {
        name: <Typography variant='caption'>Pincode</Typography>,
        selector: (data: OrderDetailsType) => data.address.pincode,
        sortable: true
    },
    {
        name: <Typography variant='caption'>Order Time</Typography>,
        cell: (data: any) => data.timeStamp.toDate().toLocaleString(),
        grow: 1.2
    }
]