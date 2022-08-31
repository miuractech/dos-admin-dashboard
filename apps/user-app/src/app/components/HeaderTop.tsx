import { Height, LocalOfferOutlined } from '@mui/icons-material'
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import india from "./images/india.svg"
import shop from "./images/shop.svg"
import right from "./images/right.svg"

export const HeaderTop = () => {
    const theme = useTheme()
    const sm = useMediaQuery(theme.breakpoints.up("sm"))
    const md = useMediaQuery(theme.breakpoints.up("md"))
    return (
        <div style={{
            height: "42px",
            backgroundColor: "#292931",
            display: "grid",
            gridTemplateColumns: md ? "1fr 1fr 1fr" : sm ? "1fr 1fr" : "1fr",
            color: "white",
            justifyItems: "center",
            alignItems: "center"
        }}>
            {md && <div ></div>}
            <div style={{ display: "flex" }}>
                <LocalOfferOutlined />
                <Typography>Get 50% off on summer haul!</Typography>
                <img src={right} alt="right" />
            </div>
            {sm && <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr 1fr", justifyItems: "center", alignItems: "center", gap: "20px" }}>
                <Button variant='contained' color='secondary' onClick={() => window.location.href = 'https://dosdesigners.web.app/'}>
                    <img src={shop} alt="shop" style={{ marginRight: "10px" }} />
                    Start Selling
                </Button>
                <Typography>Help</Typography>
                <img src={india} alt="india" />
            </div>}
        </div>
    )
}


