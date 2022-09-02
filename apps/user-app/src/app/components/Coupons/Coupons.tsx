import { Card, Divider, Paper, TextField, Typography } from '@mui/material'
import { db } from '../../../configs/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setBackDrop, setError } from '../../../store/alertslice';

export const Coupons = () => {
    const { user } = useSelector((state: RootState) => state.User)
  const [orderCount, setOrderCount] = useState(0)
  const dispatch = useDispatch()
  const [coupons, setCoupons] = useState <CouponType[]>([])
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
          // const q3 = query(collection(db, "coupons"), where("enabled", "==", true), where("expiryDate", ">=", new Date()), where("target", "==", "All Users"));
          const querySnapshot = await getDocs(q);
          const querySnapshot2 = await getDocs(q2);
          // const querySnapshot3 = await getDocs(q3);
          const targetData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CouponType[]
          const newUserCoupons = querySnapshot2.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CouponType[]
          // const allUsersCoupons = querySnapshot3.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CouponType[]
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

  console.log(coupons);

  return (
      <div className='w-80'>
      <Typography fontWeight={600} className="my-5">APPLY COUPON</Typography>
      <div className='space-y-5 grid'>
      <TextField size='small'
        InputProps={{
          endAdornment: <button className='text-blue-500 text-base cursor-pointer border-none bg-inherit active:text-blue-300 font-bold hover:text-blue-900'>Apply</button>
        }}
        />
        <Typography align='left' variant='caption'>Or choose from below</Typography>
        {coupons.map((coupon: CouponType) => (<div className='px-5 pt-5 shadow-md rounded-lg'>
          <div className='grid grid-cols-3 pb-2'>
            <div className="col-span-2 space-y-2">
              <div style={{ border: "1px dashed black" }} className="p-1 rounded-sm">
                <Typography fontWeight={600}>{coupon.couponCode}</Typography>
              </div>
              <Typography align='left' variant='subtitle2'>{coupon.couponName}</Typography>
            </div>
            <div>
              <button className='text-blue-500 text-base cursor-pointer border-none bg-inherit active:text-blue-300 font-bold hover:text-blue-900'>Apply</button>
            </div>
          </div>
          <Divider />
          <div className='text-left'>
            {coupon.target === "New User" && <Typography className='' variant='caption'>Valid only for you</Typography>}
            {/* {coupon.target === "All Users" && <Typography className='' variant='caption'>Valid for all users</Typography>} */}
            {coupon.target === "Target User" && <Typography className='' variant='caption'>Valid only for you</Typography>}
          </div>
        </div>))}
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
