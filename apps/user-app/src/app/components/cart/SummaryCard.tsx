import { Divider, Typography } from '@mui/material'
import React from 'react'

type summaryType = {
    productName: string,
    size: string,
    price: number,
    count: number
}

export const SummaryCard = ({ productName, size, price, count }: summaryType) => {
    return (
        <>
            <div className='my-3 grid grid-cols-3'>
                <div className='col-span-2 space-y-1'>
                    <Typography fontWeight={500} className='text-ellipsis whitespace-nowrap overflow-hidden'>{productName}</Typography>
                    <Typography fontWeight={500} variant="body2">size: {size}</Typography>
                </div>
                <div className='text-center space-y-1'>
                    <Typography fontWeight={600}>₹{price * count}</Typography>
                    <Typography fontWeight={500} variant="body2">Qty: {count}</Typography>
                </div>
            </div>
            <Divider />
        </>
    )
}
