import { Button, Card, Divider, Typography } from '@mui/material'
import React from 'react'

type addressProps = {
  fname:string,
  lname: string,
  email: string,
  address: string,
  country: string,
  pincode: number,
  phone: number,
  city: string,
  id: string,
  deleteAddress: (id: string) => void
  editAddress:(id:string)=>void
}

export const AddressCard = ({ fname, lname, email, address, country, pincode, phone, city, id, deleteAddress, editAddress }:addressProps) => {
  return (
      <Card className='p-5 space-y-3 max-w-sm'>
      <Typography variant='h6' align='center'>{fname} {lname}</Typography>
      <Typography className='w-4/5 m-auto' align='center'>{address}, {city}, {pincode}, {country} </Typography>
      <Typography align='center'>Phone: { phone}</Typography>
      <div className='text-center'><Button variant='contained'>Delivered Here</Button></div>
      <div className='flex justify-center gap-2'>
        <button onClick={() => editAddress(id)} className='bg-inherit border-none text-blue-700 cursor-pointer active:text-blue-500'>Edit</button>
        <Divider orientation="vertical" flexItem />
        <button onClick={() => deleteAddress(id)} className='bg-inherit border-none hover:underline cursor-pointer active:text-gray-600'>Delete</button>
      </div>
    </Card>
  )
}
