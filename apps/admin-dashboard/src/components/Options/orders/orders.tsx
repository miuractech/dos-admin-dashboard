import { Typography } from '@mui/material'
import React from 'react'
import { OrderTable } from './OrderTable'

export const Orders = () => {
    return (
        <div className='max-w-6xl m-auto'>
            <Typography variant='h4'>Orders</Typography>
            <OrderTable/>
        </div>
    )
}
