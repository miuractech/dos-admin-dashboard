import { Button, Typography } from '@mui/material'
import React from 'react'
import SimpleModal from '../../components/global/simpleModal/modal'

type Props = {
    open:boolean
    text?:string
    onClose:any
    discard:any
}

export default function AreYouSure({open,text,onClose,discard}: Props) {
  return (
    <SimpleModal
    open={open}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose={onClose}
    disableCloseButton
    style={{width:332}}
    >
        <div
        style={{padding:16}}
        >
            <Typography variant='h6' align='center' gutterBottom >
                are you sure you want to {text}
            </Typography>
            <div style={{display:'flex',justifyContent:'space-between',gap:24,margin:'24px auto',width:250}}>
                <Button
                variant='outlined'
                onClick={onClose}
                >
                    cancel
                </Button>
                <Button
                variant='contained'
                color='error'
                onClick={discard}
                >
                    Discard
                </Button>
            </div>
        </div>

    </SimpleModal>
  )
}

