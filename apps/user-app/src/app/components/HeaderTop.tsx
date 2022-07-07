import { LocalOfferOutlined } from '@mui/icons-material'
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import india from "./images/india.svg"
import shop from "./images/shop.svg"
import right from "./images/right.svg"

export const HeaderTop = () => {
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("md"))
    return (
        <div style={{
            height: "42px",
            backgroundColor: "#292931",
            display: "grid",
            gridTemplateColumns: !media ? "1fr" : "1fr 1fr 1fr",
            color: "white"
        }}>
            <div></div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LocalOfferOutlined />
                <Typography>Get 50% off on summer haul!</Typography>
                <img src={right} alt="right" />
            </div>
            {media && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                <Button variant='contained' color='secondary'>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <img src={shop} alt="shop" />
                        Start Selling
                    </div></Button>
                <Typography>Help</Typography>
                <img src={india} alt="india" />
            </div>}
        </div>
    )
}
