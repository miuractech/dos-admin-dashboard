import { Typography } from '@mui/material'
import { ProductCardCart } from './ProductCardCart'
import { RootState } from '../../../store/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const Cart = () => {
    const { cartProductList, localCart } = useSelector((state: RootState) => state.cart)
    const [cart, setcart] = useState<string | null>(null)
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(localCart))
        const obj = localStorage.getItem('cart')
        setcart(obj)
        if (!cart) return
        // console.log(JSON.parse(cart))
    }, [cart, localCart])
    return (
        <div className='p-5 md:grid grid-cols-3 gap-5'>
            <div className='space-y-5 md:col-span-2'>
                <Typography fontWeight={600} variant='h6'>My Bag</Typography>
                {cartProductList.map(item => <ProductCardCart img={item.product.sideImages[0].url} productName={item.product.productName} productSize={item.size} productPrice={item.product.price} productCompPrice={item.product.comparePrice} count={0} />)}
            </div>
            <div className='space-y-5'>
                <Typography fontWeight={500} variant='h6'>Order Summary</Typography>
            </div>
        </div>
    )
}
