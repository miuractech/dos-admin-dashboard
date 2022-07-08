import { Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import logo from "../../components/images/logo.svg"
import InputField from "../../../UI/input-field/input-field"
import { FavoriteBorderOutlined, PersonOutlineOutlined, Search, ShoppingCartOutlined } from '@mui/icons-material'

export const Header = () => {
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("md"))
    return (
        <div style={{ display: "grid", gridTemplateColumns: media ? "3fr 3fr 6fr" : "3fr 6fr", height: "85px", alignItems: "center", padding: "10px", gap: "10px" }}>
            <div>
                <img src={logo} alt="dropout" width="90%" height="100%" style={{ marginLeft: "20px" }} />
            </div>
            {media &&
                <div style={{ display: "flex", justifySelf: "center", gap: "20px" }}>
                    <div>
                        <Typography fontWeight={600} align='center' variant='subtitle1'>Create</Typography>
                        <Typography color="#C5C5C5" variant='caption'>new designs</Typography>
                    </div>
                    <div>
                        <Typography fontWeight={600} align='center' variant='subtitle1'>Shop</Typography>
                        <Typography color="#C5C5C5" variant='caption'>explore store</Typography>
                    </div>
                </div>
            }
            <div className='flex vertical-center justify-around'>
                <InputField iconend={<Search />} size='small' placeholder='Find designs or products' style={{ maxWidth: "65%", flex: "3" }} />
                <div className='flex vertical-center' >
                    <IconButton><PersonOutlineOutlined /></IconButton>
                    <Typography>Login</Typography>
                </div>
                <IconButton ><ShoppingCartOutlined /></IconButton>
                <IconButton ><FavoriteBorderOutlined /></IconButton>
            </div>
        </div >
    )
}
