import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Cardbredcrum = () => {
    const location = useLocation()
    const breadcrumbs = [
        <Typography key="1"
            style={{ color: location.pathname === '/cart' ? "#1579F9" : "" }}
            fontWeight={500} color="text.primary">
            Cart
        </Typography>,
        <Typography
            key="2"
            style={{ color: location.pathname === '/cart/shippingmethod' ? "#1579F9" : "" }}
            fontWeight={500} color="text.primary">
            Shipping
        </Typography>,
        <Typography
            key="3"
            style={{ color: location.pathname === '/cart/orderconfirmation' ? "#1579F9" : "" }}
            fontWeight={500} color="text.primary">
            Payment
        </Typography>
    ];
    return (
        <>
            <div className='py-5 mx-5 md:mx-24' >
                <Breadcrumbs separator={<ChevronRightIcon color='primary' />} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <Outlet />
        </>
    )
}
