import { Divider, Typography } from '@mui/material'
import { setError } from '../../../store/alertslice'
import { RootState } from '../../../store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { flatCoupon, flatPercentageCoupon, percentageCouponUpto } from './couponFunction'
import { CouponType } from './Coupons'
import { db } from '../../../configs/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { FieldValues, UseFormSetError } from 'react-hook-form'
import { setSelectedCoupon, setTotalAfterCoupon, setTotalAmountRemoved } from '../../../store/cartSlice'

export const CouponCard = ({ coupon, setErrors }: {
    coupon: CouponType, setErrors: UseFormSetError<FieldValues>
 }) => {
    const { orderId,orderDetails } = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

    const applyCoupon = async() => {
        try {
            if (!orderId) return
            if (!orderDetails) return
            if (orderDetails.total < coupon.minOrderValue) {
                setErrors("coupon", { message: `minimum order value is ${coupon.minOrderValue}` })
                dispatch(setError(`Minimum order value for should be atleast ${coupon.minOrderValue}`))
            } else {
                const orderRef = doc(db, "orders", orderId);
                if (coupon.couponType === "Flat") {
                    const result = flatCoupon(orderDetails.total, coupon)
                    await updateDoc(orderRef, {
                        total: result
                    });
                    dispatch(setTotalAfterCoupon(result))
                    dispatch(setTotalAmountRemoved(coupon.amount))
                    dispatch(setSelectedCoupon(coupon))
                } else if (coupon.couponType === "Flat Percentage") {
                    const result = flatPercentageCoupon(orderDetails.total, coupon)
                    await updateDoc(orderRef, {
                        total: result.totalAmount
                    });
                    dispatch(setTotalAfterCoupon(result.totalAmount))
                    dispatch(setTotalAmountRemoved(result.amountToRemove))
                    dispatch(setSelectedCoupon(coupon))
                } else if (coupon.couponType === "Percentage Upto") {
                    const result = percentageCouponUpto(orderDetails.total, coupon)
                    await updateDoc(orderRef, {
                        total: result.totalAmount
                    });
                    dispatch(setTotalAfterCoupon(result.totalAmount))
                    dispatch(setTotalAmountRemoved(result.amountToRemove))
                    dispatch(setSelectedCoupon(coupon))
                }
            }
        } catch (error) {
            dispatch(setError("Somthing went wrong please try again"))
            console.log(error);
        }
    }

  return (
      <div className='px-5 pt-5 shadow-md rounded-lg'>
          <div className='grid grid-cols-3 pb-2'>
              <div className="col-span-2 space-y-2">
                  <div style={{ border: "1px dashed black" }} className="p-1 rounded-sm">
                      <Typography fontWeight={600}>{coupon.couponCode}</Typography>
                  </div>
                  <Typography align='left' variant='subtitle2'>{coupon.couponName}</Typography>
              </div>
              <div>
                  <button onClick={applyCoupon} className='text-blue-500 text-base cursor-pointer border-none bg-inherit active:text-blue-300 font-bold hover:text-blue-900'>Apply</button>
              </div>
          </div>
          <Divider />
          <div className='text-left'>
              {coupon.target === "New User" && <Typography className='' variant='caption'>Valid only for you</Typography>}
              {/* {coupon.target === "All Users" && <Typography className='' variant='caption'>Valid for all users</Typography>} */}
              {coupon.target === "Target User" && <Typography className='' variant='caption'>Valid only for you</Typography>}
          </div>
      </div>
  )
}
