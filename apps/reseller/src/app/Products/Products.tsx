import { Button, Card, Grid, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ProductsTable } from './ProductsTable';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebaseConfig/config';
import { ProductsObject, setQueriedListings } from '../../redux-tool/products';
import { RootState } from '../../redux-tool/store';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    id: string
}

export const Products = () => {
    const [value, setValue] = React.useState(0);
    const { User } = useSelector((state: RootState) => state.User)
    const { queriedListings } = useSelector((state: RootState) => state.listings)
    const dispatch = useDispatch()
    // const [filteredData, setfilteredData] = useState<any>(null)

    const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
        if (!User) return
        const selectedTab = event.currentTarget.id
        const listingsRef = collection(db, "reSellers", User.uid, "products")
        if (selectedTab === "all") {
            const querySnapshot = await getDocs(listingsRef)
            const data = querySnapshot.docs.map(Doc => ({ ...Doc.data() }))
            dispatch(setQueriedListings(data))
            // setQueriedListings(listings)
        } else {
            const q = query(listingsRef, where("status", "==", selectedTab))
            if (selectedTab === "active") {
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }))
                dispatch(setQueriedListings(data))
            } else if (selectedTab === "inactive") {
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }))
                dispatch(setQueriedListings(data))
            } else if (selectedTab === "archived") {
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }))
                dispatch(setQueriedListings(data))
            }
        }
    };

    // useEffect(() => {
    //     if (!selectedTab) return
    //     if (!listings) return
    //     if (!inactiveListings) return
    //     if (!activeListings) return
    //     if (!archivedListings) return
    //     switch (selectedTab) {
    //         case "All":
    //             return setfilteredData(listings)
    //         case "inactive":
    //             return setfilteredData(inactiveListings)
    //         case "active":
    //             return setfilteredData(activeListings)
    //         case "archived":
    //             return setfilteredData(archivedListings)

    //         default:
    //             break;
    //     }
    // }, [selectedTab])

    useEffect(() => {
        if (!User) return
        if (queriedListings) return
        const getProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "reSellers", User.uid, "products"))
            const data = querySnapshot.docs.map(Doc => ({ ...Doc.data() }))
            dispatch(setQueriedListings(data))
        }
        getProducts()
    }, [])

    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <Grid container justifyContent="space-between" margin={[3, 0, 3]}>
                <Grid item> <Typography fontWeight={600} variant='h5'>Products</Typography></Grid>
                <Grid item><Button variant='contained' color='error'>Add Products</Button></Grid>
            </Grid>
            <Card style={{
                borderRadius: "15px",
                padding: "30px 20px 0px",
            }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: "black" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="All" {...a11yProps(0, "all")} sx={theme => ({
                                color: 'black'
                            })} />
                            <Tab label="Active" {...a11yProps(1, "active")} sx={theme => ({
                                color: 'black'
                            })} />
                            <Tab label="Inactive" {...a11yProps(2, "inactive")} sx={theme => ({
                                color: 'black'
                            })} />
                            <Tab label="Archived" {...a11yProps(3, "archived")} sx={theme => ({
                                color: 'black'
                            })} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} id="all">
                        <ProductsTable filteredData={queriedListings} />
                    </TabPanel>
                    <TabPanel value={value} index={1} id="active">
                        <ProductsTable filteredData={queriedListings} />
                    </TabPanel>
                    <TabPanel value={value} index={2} id="inactive">
                        <ProductsTable filteredData={queriedListings} />
                    </TabPanel>
                    <TabPanel value={value} index={3} id="archived">
                        <ProductsTable filteredData={queriedListings} />
                    </TabPanel>
                </Box>
            </Card>
        </div >
    )
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, id, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={id}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number, id: string) {
    return {
        id: id,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
