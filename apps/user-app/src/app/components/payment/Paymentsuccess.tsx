import { Button, Card, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import success from "../images/paymentSuccess.json"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCartProducts } from '../../../store/cartSlice';

export const Paymentsuccess = () => {
  const navigate = useNavigate()
  const disptach = useDispatch()
  useEffect(() => {
    localStorage.removeItem("cart")
    disptach(setCartProducts([]))
  }, [])
  
  return (
      <div className='md:max-w-lg m-auto mt-10'>
          <Card className="p-5">
              <Lottie animationData={success} loop={true} className="h-60" />
              <Typography textAlign="center" variant='h6'>Payment Successful</Typography>
        <Typography textAlign="center" variant='subtitle2'>Hooray! You have completed your payment.</Typography>
        <div className='text-center'><Button onClick={() => navigate("/shop")} className='mt-10' variant='outlined'>Home Page</Button></div>
          </Card>
    </div>
  )
}
