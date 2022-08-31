import { Typography } from '@mui/material'
import React from 'react'
import { OrderTable } from './OrderTable'

export const Orders = () => {
    return (
        <div className='bg-white m-5 rounded-3xl'>
            <Typography textAlign="center" className="p-5" variant='h5' fontWeight={500}>Orders</Typography>
            <div className=''><OrderTable /></div>
        </div>
    )
}
