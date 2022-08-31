import { Typography } from '@mui/material'
import React from 'react'
import Footer from '../Auth/footer/footer'
import { OrdersTable } from './OrderTable'

export const Orders = () => {
    return (
        <div className='md:m-10 bg-white rounded-3xl'>
            <Typography className='pl-5 pt-5' variant='h5' fontWeight={600}>Orders</Typography>
            <div className='p-2 rounded-xl'><OrdersTable /></div>
        </div>
    )
}
