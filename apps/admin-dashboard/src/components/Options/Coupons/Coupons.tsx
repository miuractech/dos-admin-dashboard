import { AddIcon } from '@admin/assets'
import { ApplicationButton } from '@dos/global'
import SimpleModal from '@dropout-store/simple-modal'
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { AddCoupon } from './AddCoupon'
import { CouponTable } from './CouponsTable'

export const Coupons = () => {
  const [modal, setModal] = useState(false)
  return (
    <div className='bg-white p-5 m-5 rounded-3xl'>
      <SimpleModal open={modal} onClose={()=>setModal(false)} style={{width:"50vw"}}>
        <AddCoupon setModal={setModal} />
      </SimpleModal>
      <div className='grid grid-cols-3 mb-5'>
        <div></div>
        <div className='self-center'><Typography align='center' variant='h5' fontWeight={500}>Coupons</Typography></div>
      <div style={{ flexGrow: "1", height: "50px", width: "180px", justifySelf:"center" }}>
        <ApplicationButton
          variant="default"
          clickAction={()=>setModal(true)}
          dimension={{ height: '100%', width: '100%' }}
        >
          <AddIcon /> <span>Add Coupon</span>
        </ApplicationButton>
        </div>
      </div>
        <CouponTable />
    </div>
  )
}
