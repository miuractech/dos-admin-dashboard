import { Button, Grid } from '@mui/material';
import React from 'react'
import InputField from '../../UI/input-field/input-field';
import './home.css';

export const Newletter = () => {
    return (
        <div className='third'>
            <h3>Subscribe to our newsletter!</h3>
            <Grid container justifyContent="center">
                <Grid item>
                    <InputField type="text" placeholder="Enter your e-mail address" />
                </Grid>
                <Grid item>
                    <Button style={{ background: "red" }} variant="contained">Subscribe</Button>
                </Grid>
            </Grid>
        </div>
    )
}
