import { Button, Card, Checkbox, Divider, FormControlLabel, Typography, useMediaQuery, useTheme } from '@mui/material'
import { RootState } from '../../../store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SummaryCard } from './SummaryCard'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { cartProduct } from '../../../store/cartSlice'
import SimpleModal from '@dropout-store/simple-modal'
import { Coupons } from '../Coupons/Coupons'
import { useLocation } from 'react-router-dom'
import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../configs/firebaseConfig'
import { setBackDrop } from '../../../store/alertslice'

export const OrderSummary = () => {
    const { cartProductList,selectedCoupon, orderDetails } = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.User)
    const [subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [couponModal, setCouponModal] = useState(false)
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("md"))
    const location = useLocation();
    const dispatch = useDispatch()
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
    console.log(user?.uid);
    return (
        <div>
            <SimpleModal
                open={couponModal}
                onClose={() => setCouponModal(false)}
                style={{ left: !media ?"50%":"78%"}}
            >
                <Coupons setCouponModal={setCouponModal} />
            </SimpleModal>
            <Card className='my-5 p-3'>
                <Typography fontWeight={600} gutterBottom className='mb-5'>Shipping</Typography>
                {cartProductList.map((item: cartProduct, index: number) => <SummaryCard key={index} productName={item.product.productName} size={item.size} price={item.product.price} count={item.count} />)}
                <div>
                    {location.pathname === "/cart/orderconfirmation" && <div>
                        {selectedCoupon ? (
                        <div className='h-10 flex items-center align-middle justify-between' >
                            <Typography color="green" fontWeight={600} >
                                {selectedCoupon.couponCode}
                            </Typography>
                                <Button size='small' variant='text' color='secondary' onClick={async () => {
                                    if (!orderDetails) return
                                    if (!user) return
                                    dispatch(setBackDrop(true))
                                    const orderRef = doc(db, "cart", user.uid);
                                    await updateDoc(orderRef, {
                                        couponRemark: "removed",
                                        coupon: deleteField(),
                                    });
                            }}>
                                Change
                            </Button>
                        </div>
                        ) : (
                        <div className='flex justify-between py-4 cursor-pointer' onClick={() => { setCouponModal(true) }}>
                            <div className='flex gap-4'>
                                <LocalOfferIcon />
                                <Typography>Apply Cupon Code</Typography>
                            </div>
                            <ChevronRightIcon />
                        </div>
                        )}
                    </div>}
                    <Divider />
                    <div className='flex gap-2 py-3'>
                        <input type="Checkbox" className='h-4 w-4 cursor-pointer' />
                        <Typography>Add to gift options</Typography>
                    </div>
                </div>
                <Divider />
                <div className='grid grid-cols-2 grid-rows-3 gap-2 p-2'>
                    <Typography>Subtotal {cartProductList.length > 1 ? `(${cartProductList.length} items)` : ""}</Typography>
                    <Typography className='text-right' fontWeight={700}>₹{subtotal}</Typography>
                    <Typography>Discount</Typography>
                    <Typography fontWeight={500} className='text-right text-green-500'>-₹{discount}</Typography>
                    <Typography>Shipping</Typography>
                    <Typography fontWeight={500} className='text-right text-green-500'>FREE</Typography>
                    {orderDetails?.discount && <Typography>Coupon Discount</Typography>}
                    {orderDetails?.discount && <Typography fontWeight={500} className='text-right text-green-500'>-₹{orderDetails.discount}</Typography>}
                </div>
                <Divider />
                <div className='flex justify-between pt-3'>
                    <Typography variant='h6' fontWeight={600}>Total:</Typography>
                    <Typography variant='h6' fontWeight={600}>₹{orderDetails?.total ? orderDetails?.total :subtotal}</Typography>
                </div>
            </Card >
        </div >
    )
}