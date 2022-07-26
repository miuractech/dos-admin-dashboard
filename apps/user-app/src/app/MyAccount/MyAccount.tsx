import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import fav from './images/fav.svg'
import address from './images/address.svg'
import designe from './images/designe.svg'
import order from './images/order.svg'
import profile from './images/profile.svg'

export const MyAccount = () => {
  return (
      <div className='mt-10 md:mt-10 md:w-3/4 md:m-auto'>
          <Typography align='center' variant='h5'>My Account</Typography>
          <div className='grid md:grid-cols-3 gap-5'>
              <Card className='p-5 text-center'>
          <img src={order} alt="order" />
          <Typography variant='h6'>Your Order</Typography>
          <Button variant='outlined'>Track Order</Button>
              </Card>
        <Card className='p-5 text-center'>
          <img src={profile} alt="profile" />
          <Typography variant='h6'>Profile</Typography>
          <Button variant='outlined'>Edit Profile</Button>
              </Card>
        <Card className='p-5 text-center'>
          <img src={address} alt="address" />
          <Typography variant='h6'>Your Address</Typography>
          <Button variant='outlined'>Manage Address</Button>
              </Card>
        <Card className='p-5 text-center'>
          <img src={fav} alt="fav" />
          <Typography variant='h6'>Wishlist</Typography>
          <Button variant='outlined'>View Wishlist</Button>
              </Card>
        <Card className='p-5 text-center'>
          <img src={designe} alt="designe" />
          <Typography variant='h6'>My Designs</Typography>
          <Button variant='outlined'>View Designs</Button>
              </Card>
          </div>
    </div>
  )
}
