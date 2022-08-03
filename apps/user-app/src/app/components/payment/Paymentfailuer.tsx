import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import Lottie from "lottie-react";
import fail from "../images/paymentFailed.json"
import { useNavigate } from 'react-router-dom';

export const Paymentfailuer = () => {
    const navigate = useNavigate()
  return (
      <div className='md:max-w-lg m-auto mt-10'>
          <Card className="p-5">
              <Lottie animationData={fail} loop={true} className="h-60" />
              <Typography textAlign="center" variant='h6'>Transaction failed</Typography>
              <Typography textAlign="center" variant='subtitle2'>Please try a diffrent payment method</Typography>
              <div className='text-center'><Button onClick={() => navigate("/cart")} className='mt-10' variant='outlined'>Try again</Button></div>
          </Card>
      </div>
  )
}
