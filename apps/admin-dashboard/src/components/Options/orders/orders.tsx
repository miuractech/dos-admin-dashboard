import { Typography } from '@mui/material'
import React from 'react'
import { OrderTable } from './OrderTable'

export const Orders = () => {
    return (
        <div className='max-w-7xl  mt-20'>
            <Typography variant='h4'>Orders</Typography>
            <div className='p-2 rounded-xl'><OrderTable /></div>
        </div>
    )
}
