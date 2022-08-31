import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { PeopleAltOutlined, DocumentScannerOutlined, FormatListBulletedOutlined, LoyaltyOutlined, WarningAmberOutlined, AssessmentOutlined, AccountBalanceOutlined, SettingsOutlined, InfoOutlined, DeleteOutlined, LoginOutlined, PersonOutlineOutlined, NotificationsNoneOutlined, MoreVertOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from './navLogo/logo.svg'
import add from './navLogo/carbon_add.svg'
import designLine from './navLogo/clarity_design-line.svg'
import tShirt from './navLogo/fa-solid_tshirt.svg'
import hand from './navLogo/mdi_hand-coin-outline.svg'
import payment from './navLogo/fluent_payment-20-regular.svg'
import setting from './navLogo/carbon_settings.svg'
import customerSupport from './navLogo/bx_bx-support.svg'
import logout from './navLogo/carbon_logout.svg'
import orders from './navLogo/orders-icon.svg'
import { RootState } from '../../redux-tool/store';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    background: '#161C33',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    background: '#161C33',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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

export function NewHeader({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const { User } = useSelector((state: RootState) => state.User)
    const [open, setOpen] = React.useState(false)
    const [modal, setModal] = React.useState(false)
    const [selectedOption, setSelectedOption] = React.useState("Add Product")
    const navigate = useNavigate()
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color="inherit">
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton
                        className="menu"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <PersonOutlineOutlined />
                            <Typography fontWeight={500}>{User?.email}</Typography>
                            <IconButton>
                                <MoreVertOutlined />
                            </IconButton>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} >
                <DrawerHeader >
                    <img src={logo} alt="logo" width="80%" height="80%" />
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon style={{ color: 'white' }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {navData.map((data) => (
                        <ListItem className="menu" key={data.name}
                            disablePadding sx={{ display: 'block', color: selectedOption === data.name ? "#42a5f5" : "white", height: "15%" }}
                            onClick={() => navigate(`/${data.route}`)}
                        >
                            <ListItemButton
                                className="menu"
                                onClick={() => setSelectedOption(data.name)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    className="menu"
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: selectedOption === data.name ? "#42a5f5" : "white"
                                    }}
                                >
                                    <img style={{ width: "25px" }} src={data.icon} alt="logo" />
                                </ListItemIcon>
                                <ListItemText primary={data.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer >
            <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box >
    );
}

const navData = [
    {
        icon: designLine,
        name: 'Design Product',
        route: "designproduct"
    },
    {
        icon: tShirt,
        name: 'Products',
        route: "products"
    },
    {
        icon: orders,
        name: 'Orders',
        route: "orders"
    },
    {
        icon: hand,
        name: 'Sales View',
        route: "salesview"
    },
    {
        icon: payment,
        name: "Payment",
        route: "payment"
    },
    {
        icon: setting,
        name: "Settings",
        route: "settings"
    },
    {
        icon: customerSupport,
        name: "Support",
        route: "support"
    },
    {
        icon: logout,
        name: "Logout",
        route: "logout"
    }]
