import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/images/navLogo/logo.svg'
import add from '../assets/images/navLogo/carbon_add.svg'
import designLine from '../assets/images/navLogo/clarity_design-line.svg'
import tShirt from '../assets/images/navLogo/fa-solid_tshirt.svg'
import hand from '../assets/images/navLogo/mdi_hand-coin-outline.svg'
import payment from '../assets/images/navLogo/fluent_payment-20-regular.svg'
import setting from '../assets/images/navLogo/carbon_settings.svg'
import customerSupport from '../assets/images/navLogo/bx_bx-support.svg'
import { Link } from 'react-router-dom';
const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    background: '#161C33',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#161C33',
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({ theme }) => ({
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
}));
//Menu items and routes list
const listItemIcons = [add, designLine, tShirt, hand, payment, setting, customerSupport]
const linkPaths = ['/', '/', '/', '/', '/', '/', '/', '/', '/', '/', '/', '/', '/']
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
export default function SideNav() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} >
                <IconButton
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        height: '75px',
                        color: '#ffff',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                {open && <DrawerHeader sx={{ height: '75px' }}>
                    <img src={logo} alt="" width='180px' object-fit='contain' />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon htmlColor='white' />}
                    </IconButton>
                </DrawerHeader>}
                <Divider />
                <List>
                    {['Add Product', 'View Store', 'Products ', 'Sales View', 'Payment', 'Settings', 'Support'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <Link style={{ textDecoration: 'none' }} to={linkPaths[index]}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img src={listItemIcons[index]} alt="" />
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: '#FFFF' }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}