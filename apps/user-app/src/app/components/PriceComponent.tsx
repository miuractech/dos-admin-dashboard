import { Button, Card, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export const MobilePriceComponent = ({ setSize, size }: { setSize: React.Dispatch<React.SetStateAction<string | null>>, size:string|null }) => {
    const { product } = useSelector((state: RootState) => state.product)
    const theme = useTheme()
    return (
        product && <div style={{ height: "50px", backgroundColor: theme.palette.primary.main, display: "grid", alignItems: "center", gridTemplateColumns: "2.5fr 1fr" }}>
            <div style={{
                height: "50px",
                backgroundColor: "#F3F3F3",
                WebkitClipPath: "polygon(0% 0%, calc(100% - 25px) 0, 100% 50%, calc(100% - 25px) 100%, 0% 100%)",
                clipPath: "polygon(0% 0%, calc(100% - 25px) 0, 100% 50%, calc(100% - 25px) 100%, 0% 100%)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "0px 10px",
                overflowX: "auto",
                maxWidth: "250px"
            }}>
                {product.sizeAvailable.map((sizee, index) => <Button
                    size='small'
                    variant={sizee === size ? 'contained' : "outlined"}
                    onClick={() => setSize(sizee)}
                    key={index}
                >
                    {sizee}
                </Button>)}
            </div>
            <Typography style={{ fontFamily: "'Average Sans', sans-serif" }} justifySelf="center" variant='h6' fontWeight={400} color="white">₹{product.price}</Typography>
        </div >
    )
}
