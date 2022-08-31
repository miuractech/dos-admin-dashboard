import { MenuOutlined, PersonOutlineOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Badge, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import React, { useState } from 'react'
import logo from "./images/logo.svg"
import man from "./images/man.svg"
import woman from "./images/woman.svg"
import child from "./images/child.svg"
import about from "./images/about.svg"
import shop from "./images/shop.svg"
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

export const MobileHeader = () => {
    const [state, setState] = React.useState(false)
    const { cartProductList } = useSelector((state: RootState) => state.cart)
    const navigate = useNavigate()
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            }

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {first.map((text) => (
                    <ListItem key={text.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={text.icon} alt={text.name} width="20px" />
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {second.map((text) => (
                    <ListItem key={text.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={text.icon} alt={text.name} width="20px" />
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <>
            <SwipeableDrawer
                anchor={"left"}
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
            <div style={{ height: "65px", display: "grid", gridTemplateColumns: "1fr 3fr 2fr", alignItems: "center", boxShadow: "0px 9px 9px rgba(229, 229, 229, 0.3)" }}>
                <div ><IconButton onClick={toggleDrawer(true)}><MenuOutlined /></IconButton></div>
                <div style={{ paddingTop: "5px 5px", alignSelf: "center", justifySelf:"baseline" }}><img src={logo} alt="dropoutstore" style={{ maxWidth: "150px" }} /></div>
                <div className='flex gap-5'>
                    <SearchOutlined />
                    <PersonOutlineOutlined />
                    <Badge className='cursor-pointer' color="secondary" badgeContent={cartProductList.length}>
                        <ShoppingCartOutlined onClick={() => navigate("/cart")} />
                    </Badge>
                </div>
            </div>
        </>
    )
}

const first = [
    {
        name: 'Men',
        icon: man
    },
    {
        name: 'Women',
        icon: woman
    },
    {
        name: 'Kids',
        icon: child
    },
    {
        name: 'Merch',
        icon: man
    },]

const second = [
    {
        name: 'About',
        icon: about
    },
    {
        name: 'Shop',
        icon: shop
    },]
