import { Button, Card, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import InputField from '../../UI/input-field/input-field'

export const Verification = () => {
    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Typography fontWeight={600} variant='h5'>Products</Typography>
                </div>
                <div>
                    <Button variant='contained' color='error'>Add Products</Button>
                </div>
            </div>
            <Card style={{
                borderRadius: "15px",
                padding: "15px"
            }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                        <Typography fontWeight={500}>Price</Typography>
                        <InputField helperText="Price" fullWidth />
                    </div>
                    <div>sdf</div>
                </div>
            </Card>
        </div>
    )
}
