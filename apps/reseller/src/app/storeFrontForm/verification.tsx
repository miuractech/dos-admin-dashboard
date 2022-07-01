import { Button, TextField } from '@mui/material'
import React from 'react'
import Header from '../sideNav/header'

export const Verification = () => {
    return (
        <div>
            <Header />
            PAN
            <TextField label="Verification" />
            <Button variant='contained'>Verify</Button>
        </div>
    )
}
