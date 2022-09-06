import { Card, Divider, Paper, TextField, Typography } from '@mui/material'
import { db } from '../../../configs/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setBackDrop, setError } from '../../../store/alertslice';
import { useForm } from 'react-hook-form';
import { CouponCard } from './CouponCard';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Inputs = {
  coupon:string
};

const schema = yup.object({
  coupon: yup.string().min(3).max(20).required('Coupon code is required'),
});

export const Coupons = ({ setCouponModal }: { setCouponModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user } = useSelector((state: RootState) => state.User)
  const { orderDetails } = useSelector((state: RootState) => state.cart)
  const [orderCount, setOrderCount] = useState(0)
  const dispatch = useDispatch()
  const [coupons, setCoupons] = useState<CouponType[]>([])
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })
  const setErrors = useForm().setError
    const getCoupons = async() => {
        try {
          if (!user) return
          dispatch(setBackDrop(true))
          const docRef = doc(db, "users", user.uid, "Count", "orderCount");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setOrderCount(docSnap.data()['count'])
          }
          const phone = Number(user.phoneNumber?.slice(3))
          const q = query(collection(db, "coupons"), where("enabled", "==", true), where("expiryDate", ">=", new Date()), where("userPhone", "==", phone));
          const q2 = query(collection(db, "coupons"), where("enabled", "==", true), where("expiryDate", ">=", new Date()), where("target", "in", ["New User", "All Users"]));
          const querySnapshot = await getDocs(q);
          const querySnapshot2 = await getDocs(q2);
          const targetData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CouponType[]
          const newUserCoupons = querySnapshot2.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CouponType[]
          setCoupons((prev) => [...prev, ...targetData, ...newUserCoupons])
          dispatch(setBackDrop(false))
        } catch (error) {
          console.log(error);
          dispatch(setBackDrop(false))
          dispatch(setError("Error getting coupons try again"))
        }
  }
  useEffect(() => {
    if (coupons.length === 0) {
      getCoupons()
    }
  }, [user])
  
  const onsubmit = async(data: Inputs) => {
    try {
      if (!orderDetails) return
      const q = query(collection(db, "coupons"), where("couponCode", "==", data.coupon));
      const querySnapshot = await getDocs(q);
      const targetData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CouponType[]
      if (targetData.length === 0) {
        dispatch(setError(`${data.coupon} is not valid`))
      } else {
        const coupon = targetData[0]
        if (orderDetails.total < coupon.minOrderValue) {
          setErrors("coupon", { message: `minimum order value is ${coupon.minOrderValue}` })
          dispatch(setError(`Minimum order value for should be atleast ${coupon.minOrderValue}`))
        } if (coupon.expiryDate < new Date()) {
          dispatch(setError(`Coupon expired on ${coupon.expiryDate.toDate().toLocaleString()}`))
        }else {
          if (!user) return
          const orderRef = doc(db, "cart", user.uid);
          await updateDoc(orderRef, {
            coupon
          });   
          setCouponModal(false)
        }
      }
    } catch (error) {
      dispatch(setError("Somthing went wrong please try again"))
      console.log(error);
    }
  }

  return (
    <div className='w-80'>
      <Typography fontWeight={600} className="my-5">APPLY COUPON</Typography>
      <div className='space-y-5 grid'>
        <form onSubmit={handleSubmit(onsubmit)}>
          <TextField size='small'
            error={Boolean(errors.coupon)}
            helperText={errors.coupon?.message}
            inputProps={{ ...register("coupon") }}
            InputProps={{
              endAdornment: <button type='submit' className='text-blue-500 text-base cursor-pointer border-none bg-inherit active:text-blue-300 font-bold hover:text-blue-900'>Apply</button>
            }}
            placeholder="Coupon Code"
            fullWidth
          />
        </form>
        <Typography align='left' variant='caption'>Or choose from below</Typography>
        {coupons.map((coupon: CouponType) => (<CouponCard setCouponModal={setCouponModal} setErrors={setErrors} coupon={coupon} />))}
      </div>
      </div>
  )
}

export type CouponType = {
  target: "All Users"|"New User"|"Target User",
  amount: number,
  percentage: number,
  percentageupto: number,
  couponCode: string,
  couponName: string,
  description: string,
  minOrderValue: number,
  numUsage: number,
  couponType: "Flat" | "Flat Percentage" | "Percentage Upto",
  userPhone: number,
  expiryDate: any,
  enabled: boolean,
  id: string
};
