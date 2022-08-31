import { Typography } from '@mui/material'
import React from 'react'
import { MerchentTable } from './MerchentTable'

export const Merchants = () => {
    return (
        <div className='bg-white m-5 rounded-3xl'>
            <Typography textAlign="center" className="p-5" variant='h5' fontWeight={500}>Merchants</Typography>
            <MerchentTable/>
        </div>
    )
}
