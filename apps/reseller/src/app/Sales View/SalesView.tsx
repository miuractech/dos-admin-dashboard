import { Typography } from '@mui/material'
import React from 'react'
import Footer from '../Auth/footer/footer'
import { SalesViewTable } from './SalesViewTable'

export const SalesView = () => {
    return (
        <div className='max-w-7xl  mt-20'>
            <Typography variant='h4'>Orders</Typography>
            <div className='p-2 rounded-xl'><SalesViewTable /></div>
            <Footer/>
        </div>
    )
}
