import { Typography } from '@mui/material'
import { ProductCardCart } from './ProductCardCart'
import { RootState } from '../../../store/store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const Cart = () => {
    const { cartProductList, localCart } = useSelector((state: RootState) => state.cart)
    console.log(cartProductList);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(localCart))
    }, [localCart])
    return (
        <div style={{ backgroundColor: "#f9f9f9" }} className='m-4 grid md:mx-14 md:grid-cols-3 md:gap-6'>
            <div className='col-span-2'>
                <Typography fontWeight={600} variant='h6'>My Bag</Typography>
                <ProductCardCart />
            </div>
            <div className=''>
                <Typography fontWeight={500} variant='h6'>Order Summary</Typography>
            </div>
        </div>
    )
}
