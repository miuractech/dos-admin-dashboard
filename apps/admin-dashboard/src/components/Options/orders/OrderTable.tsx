import { OrderDetailsType, setOrderDetails } from '../../../store/orderSlice';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import DataTable from "react-data-table-component"
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../../config/firebase.config';
import { RootState } from '../../../store/index';
import { Typography } from '@mui/material';

export const OrderTable = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector((state: RootState) => state.orders)
    const columns = [
        {
            cell: (data: OrderDetailsType) => <div>
                <img src={ data.items[0].img} alt="img" className='w-16'/>
            </div>,
            grow: 0.5
        },
        {
            name: <Typography variant='h6'>Amount</Typography>,
            cell: (data: OrderDetailsType) => <div>
                <Typography>{data.total }</Typography>
            </div>,
        },
        {
            name: <Typography variant='h6'>Name</Typography>,
            cell: (data: OrderDetailsType) => <div>
                <Typography>{data.address.firstName }</Typography>
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
            cell: (data: any) => <div>
                <Typography>{data.timeStamp.toDate().toLocaleString()}</Typography>
            </div>,
        }
    ]

    useEffect(() => {
        const ordersRef = collection(firestore, "orders");
        const q = query(ordersRef, where("status", "==", "success"));

        const unsub = onSnapshot(q, (doc) => {
            const data = doc.docs.map(order => ({ ...order.data() }))
            console.log(data);
            dispatch(setOrderDetails(data));
        });
        return () => unsub()
    }, [])
    

    return (
      <DataTable
          columns={columns}
          data={orders}
            customStyles={customStyles}
        expandableRows
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
