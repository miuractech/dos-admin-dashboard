import React from 'react'
import Lottie from "lottie-react";
import notfound from "../assets/images/404.json"
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate()
  return (
      <div className='mt-14 text-center space-y-10'>
          <Lottie animationData={notfound} loop={true} className="h-60" />
          <Typography variant='h3' align='center'>Page Not Found 404</Typography>
          <Button className='w-32 m-auto' onClick={() => navigate("/")} variant='outlined'>Home Page</Button>
    </div>
  )
}
