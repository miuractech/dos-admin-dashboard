import { Divider, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'

type Props = {
    fontFamily:string,
}

export default function CustomFonts({fontFamily,}: Props) {
    const [open, setOpen] = useState(false)
  return (
    <>
        <div 
        className='pointer-cursor width100'
        onClick={()=>setOpen(true)}
        >
            {fontFamily}
        </div>
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        >
            <div 
            className="modal"
            style={{width:'80%'}}
            >
                <Typography
                variant='h6'
                >
                    Choose Font
                </Typography>
                <Divider />
                
            </div>
        </Modal>
    </>
  )
}