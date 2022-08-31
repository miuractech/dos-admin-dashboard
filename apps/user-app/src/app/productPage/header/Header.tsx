import { Badge, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import logo from "../../components/images/logo.svg"
import InputField from "../../../UI/input-field/input-field"
import { FavoriteBorderOutlined, PersonOutlineOutlined, Search, ShoppingCartOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("md"))
    const navigate = useNavigate()
    const { cartProductList } = useSelector((state: RootState) => state.cart)
    return (
        <div style={{ display: "grid", gridTemplateColumns: media ? "3fr 3fr 6fr" : "3fr 6fr", height: "10%", alignItems: "center", padding: "10px", gap: "10px" }}>
            <div>
                <img src={logo} alt="dropout" width="90%" height="100%" style={{ marginLeft: "20px" }} />
            </div>
            {media &&
                <div style={{ display: "flex", justifySelf: "center", gap: "20px" }}>
                    <div onClick={() => navigate("/CMI")} className="cursor-pointer">
                        <Typography fontWeight={600} align='center' variant='subtitle1'>Create</Typography>
                        <Typography color="#C5C5C5" variant='caption'>new designs</Typography>
                    </div>
                    <div className="cursor-pointer">
                        <Typography fontWeight={600} align='center' variant='subtitle1'>Shop</Typography>
                        <Typography color="#C5C5C5" variant='caption'>explore store</Typography>
                    </div>
                </div>
            }
            <div className='flex vertical-center justify-around'>
                <InputField iconend={<Search />} size='small' placeholder='Find designs or products' style={{ maxWidth: "65%", flex: "3" }} />
                <div className='flex vertical-center' >
                    <PersonOutlineOutlined className='cursor-pointer' />
                </div>
                <div onClick={()=>navigate("/cart")}>
                    <Badge className='cursor-pointer' color="secondary" badgeContent={cartProductList.length}>
                        <ShoppingCartOutlined className='cursor-pointer' />
                    </Badge>
                </div>
                <FavoriteBorderOutlined className='cursor-pointer' />
            </div>
        </div >
    )
}
