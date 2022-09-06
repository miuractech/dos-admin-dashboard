import { Divider, Typography } from '@mui/material'
import { setBackDrop, setError } from '../../../store/alertslice'
import { RootState } from '../../../store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CouponType } from './Coupons'
import { db } from '../../../configs/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { FieldValues, UseFormSetError } from 'react-hook-form'

export const CouponCard = ({ coupon, setErrors, setCouponModal }: {
    coupon: CouponType,
    setErrors: UseFormSetError<FieldValues>,
    setCouponModal: React.Dispatch<React.SetStateAction<boolean>>
 }) => {
    const { orderDetails } = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.User)
    const dispatch = useDispatch()

    const applyCoupon = async () => {
        dispatch(setBackDrop(true))
        try {
            if (!orderDetails) return
            if (orderDetails.total < coupon.minOrderValue) {
                setErrors("coupon", { message: `minimum order value is ${coupon.minOrderValue}` })
                dispatch(setError(`Minimum order value for should be atleast ${coupon.minOrderValue}`))
                dispatch(setBackDrop(false))
            } else {
                if (!user) return
                const orderRef = doc(db, "cart", user.uid);
                await updateDoc(orderRef, {
                    coupon
                });
                setCouponModal(false)
            }
        } catch (error) {
            dispatch(setError("Somthing went wrong please try again"))
            dispatch(setBackDrop(false))
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
