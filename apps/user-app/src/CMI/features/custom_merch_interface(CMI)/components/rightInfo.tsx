import { Accordion, AccordionDetails, AccordionSummary, Button, Drawer, Typography } from '@mui/material'
import { RootState } from '../../../../store/store'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWarning } from '../../../../store/alertslice'
import { GetPhoneNumber } from '../../../../app/components/cart/GetPhoneNumber';
import { GetOTP } from '../../../../app/components/cart/GetOTP';

type Props = {
  selectedId: string | null,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
  previews: boolean,
  setPreviews: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RightInfo({ selectedId, setSelectedId, previews, setPreviews }: Props) {
  const { selectedSize } = useSelector((state: RootState) => state.designer)
  const dispatch = useDispatch()
  const [userDrawer, setUserDrawer] = useState(false)
  const { step, user } = useSelector((state: RootState) => state.User)

  useEffect(() => {
    if (user) {
      setUserDrawer(false)
    }
  }, [user])
  

  return (
    <>
    <Accordion
      variant='outlined'
      expanded={true}
      // onChange={() => setSelectedId(null)}
      style={{ marginTop: -3 }}

    >

      <AccordionDetails
        style={{ height: 45, overflowY: 'auto' }}
      >
        Price : <strong>600/-</strong>
      </AccordionDetails>
      <Button variant='contained' color='secondary' fullWidth sx={{ flexFlow: 1 }} onClick={() => { 
        if (selectedSize) {
          if (user) {
            setPreviews(true)
          } else {
            setUserDrawer(true)
          }
        } else {
          dispatch(setWarning("Please select a size before proceeding"))
        }
       }} >
        Finish
      </Button>
      </Accordion>
      <Drawer anchor='left' open={userDrawer} onClose={() => setUserDrawer(false)}>
        {step === 'phone' ? (<GetPhoneNumber />) : (<GetOTP />)}
      </Drawer>
      {!user && <div id="sign-in-button"></div>}
    </>
  )
}