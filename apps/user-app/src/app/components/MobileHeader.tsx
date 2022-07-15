import { MenuOutlined, PersonOutlineOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import React, { useState } from 'react'
import logo from "./images/logo.svg"
import man from "./images/man.svg"
import woman from "./images/woman.svg"
import child from "./images/child.svg"
import about from "./images/about.svg"
import shop from "./images/shop.svg"

export const MobileHeader = () => {
    const [state, setState] = React.useState(false)
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
            <div style={{ height: "65px", display: "grid", gridTemplateColumns: "1fr 4fr 1fr 1fr 1fr", padding: "0px 0px 0px", alignItems: "center", boxShadow: "0px 9px 9px rgba(229, 229, 229, 0.3)" }}>
                <div ><IconButton onClick={toggleDrawer(true)}><MenuOutlined /></IconButton></div>
                <div style={{ paddingTop: "5px 5px", alignSelf: "center" }}><img src={logo} alt="dropoutstore" style={{ maxWidth: "150px" }} /></div>
                <IconButton><SearchOutlined /></IconButton>
                <IconButton><PersonOutlineOutlined /></IconButton>
                <IconButton><ShoppingCartOutlined /></IconButton>
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
