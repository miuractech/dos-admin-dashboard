import { OrderDetailsType } from '../../../store/orderSlice';
import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import DataTable, { ExpanderComponentProps } from "react-data-table-component"
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../../config/firebase.config';
import { RootState } from '../../../store/index';
import { Chip, CircularProgress, Divider, Tooltip, Typography } from '@mui/material';
import { setCouponsDetails } from '../../../store/couponSlice';
import { Inputs } from './AddCoupon';
import { IOSSwitch } from '../../global/button_IOS/IOS';

export const CouponTable = () => {
    const dispatch = useDispatch()
    const { Coupons } = useSelector((state: RootState) => state.coupons)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const ordersRef = collection(firestore, "coupons");
        const q = query(ordersRef, orderBy("expiryDate", "asc"));
        const unsub = onSnapshot(q, (doc) => {
            const data = doc.docs.map(order => ({ ...order.data(), id: order.id }))
            console.log(data);
            setLoading(false)
            dispatch(setCouponsDetails(data));
        });
        return () => unsub()
    }, [])

    const ExpandedComponent: React.FC<ExpanderComponentProps<Inputs>> = ({ data }) => {
        return (
            <div className='w-6/12 m-auto my-5 space-y-5 bg-slate-100 p-5 rounded-3xl'>
                <div className='grid grid-cols-2 gap-3'>
                    <Typography>Target :</Typography>
                    <Typography>{data.target}</Typography>
                    {data.userPhone && (
                        <Typography>Number :</Typography>
                    )}
                    {data.userPhone && (
                        <Typography>{data.userPhone}</Typography>
                    )}
                    <Typography>Type :</Typography>
                    <Typography>{data.couponType}</Typography>
                    {data.couponType === "Flat" && (
                        <Typography>Amount :</Typography>
                    )}
                    {data.couponType === "Flat" && (
                        <Typography>{data.amount}</Typography>
                    )}
                    {data.couponType === "Flat Percentage" && (
                        <Typography>Percentage :</Typography>
                    )}
                    {data.couponType === "Flat Percentage" && (
                        <Typography>{data.percentage}</Typography>
                    )}
                    {data.couponType === "Percentage Upto" && (
                        <Typography>Percentage :</Typography>
                    )}
                    {data.couponType === "Percentage Upto" && (
                        <Typography>{data.percentage}</Typography>
                    )}
                    {data.couponType === "Percentage Upto" && (
                        <Typography>Discount Upto :</Typography>
                    )}
                    {data.couponType === "Percentage Upto" && (
                        <Typography>{data.percentageupto}</Typography>
                    )}
                    <Typography>Minimum order value :</Typography>
                    <Typography>{data.minOrderValue}</Typography>
                    <Typography>Max Usage / user :</Typography>
                    <Typography>{data.numUsage}</Typography>
                    <Typography>Coupon Code :</Typography>
                    <Typography>{data.couponCode}</Typography>
                    <Typography>Coupon Name :</Typography>
                    <Typography>{data.couponName}</Typography>
                    <Typography>Expiry Date :</Typography>
                    <Typography>{data.expiryDate.toDate().toLocaleString()}</Typography>
                </div>
                <Divider/>
                <Typography align='center'>{data.description ? <div dangerouslySetInnerHTML={{ __html: data.description }} /> : 'No Description found'}</Typography>
                </div>
        )
    };

    const columns = [
        {
            name: "Coupon Name",
            cell: (data: Inputs) => <div>
                <Tooltip title={data.couponName} arrow>
                    <Typography variant='caption'>{data.couponName}</Typography>
                </Tooltip>
            </div>
        },
        {
            name: "Coupon Code",
            cell: (data: Inputs) => <div>
                <Tooltip title={data.couponCode} arrow>
                    <Typography variant='caption'>{data.couponCode}</Typography>
                </Tooltip>
            </div>
        },
        {
            name: "Target",
            selector: (data: Inputs) => data.target,
            sortable: true
        },
        {
            name: "Type",
            selector: (data: Inputs) => data.couponType,
            sortable: true
        },
        {
            name: "Enable",
            cell: (data: Inputs) => <IOSSwitch checked={data.enabled} onChange={() => toggle(data.id, data.enabled)} />,
            sortable: true
        },
    ]

    const toggle = async(id:string, enabled:boolean) => {
        const couponRef = doc(firestore, "coupons", id);
        await updateDoc(couponRef, {
            enabled: !enabled
        });
        
    }

    return (
        <DataTable
            columns={columns}
            data={Coupons}
            customStyles={customStyles}
            pagination
            highlightOnHover
            pointerOnHover
            fixedHeader
            fixedHeaderScrollHeight="80vh"
            progressPending={loading}
            progressComponent={<CircularProgress />}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
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