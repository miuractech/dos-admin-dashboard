import { Card, Checkbox, Divider, FormControlLabel, Typography, useMediaQuery, useTheme } from '@mui/material'
import { RootState } from '../../../store/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SummaryCard } from './SummaryCard'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { cartProduct } from '../../../store/cartSlice'
import SimpleModal from '@dropout-store/simple-modal'
import { Coupons } from '../Coupons/Coupons'

export const OrderSummary = ({ setUserDrawer }: { setUserDrawer?: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { cartProductList, localCart } = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.User)
    const [subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [couponModal, setCouponModal] = useState(false)
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("md"))
    useEffect(() => {
        const arr: number[] = []
        const arr1: number[] = []
        cartProductList.forEach(item => {
            arr.push(item.product.price * item.count)
        })
        cartProductList.forEach(item => {
            arr1.push(item.product.comparePrice * item.count - item.product.price * item.count)
        })
        const result = arr.reduce((total, num) => {
            return total + num
        }, 0)
        const result1 = arr1.reduce((total, num) => {
            return total + num
        }, 0)
        setSubtotal(result)
        setDiscount(result1)
    }, [cartProductList])

    return (
        <div>
            <SimpleModal
                open={couponModal}
                onClose={() => setCouponModal(false)}
                style={{ left: !media ?"50%":"78%"}}
            >
                <Coupons/>
            </SimpleModal>
            <Card className='my-5 p-3'>
                <Typography fontWeight={600} gutterBottom className='mb-5'>Shipping</Typography>
                {cartProductList.map((item: cartProduct, index: number) => <SummaryCard key={index} productName={item.product.productName} size={item.size} price={item.product.price} count={item.count} />)}
                <div className='flex justify-between py-4 cursor-pointer' onClick={() => {
                    if (!user && setUserDrawer) {
                        setUserDrawer(true)
                    } else {
                        setCouponModal(true)
                    }
                }}>
                    <div className='flex gap-4'>
                        <LocalOfferIcon />
                        <Typography>Apply Cupon Code</Typography>
                    </div>
                    <ChevronRightIcon />
                </div>
                <Divider />
                <div className='flex gap-2 py-3'>
                    <input type="Checkbox" className='h-4 w-4 cursor-pointer' />
                    <Typography>Add to gift options</Typography>
                </div>
                <Divider />
                <div className='grid grid-cols-2 grid-rows-3 gap-2 p-2'>
                    <Typography>Subtotal {cartProductList.length > 1 ? `(${cartProductList.length} items)` : ""}</Typography>
                    <Typography className='text-right' fontWeight={700}>₹{subtotal}</Typography>
                    <Typography>Discount</Typography>
                    <Typography fontWeight={500} className='text-right text-green-500'>-₹{discount}</Typography>
                    <Typography>Shipping</Typography>
                    <Typography fontWeight={500} className='text-right text-green-500'>FREE</Typography>
                </div>
                <Divider />
                <div className='flex justify-between pt-3'>
                    <Typography variant='h6' fontWeight={600}>Total:</Typography>
                    <Typography variant='h6' fontWeight={600}>₹{subtotal}</Typography>
                </div>
            </Card >
        </div >
    )
}
