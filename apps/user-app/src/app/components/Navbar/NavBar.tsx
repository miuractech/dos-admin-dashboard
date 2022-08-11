import { Box,  Divider,  Menu,  MenuItem,  Popover, Typography, useTheme } from '@mui/material'
import { catogoryType } from '../../../store/product'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

export const NavBar = () => {
    const { Family,Category,subCategory } = useSelector((state: RootState) => state.product)
    const [selectedFamily, setSelectedFamily] = useState<null | string>(null)
    const [familyId, setFamilyId] = useState<string | null>(null)
    const [selectedCatogory, setSelectedCatogory] = useState<catogoryType[] | null>(null)
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!Category)return
        const result = Category.filter(item => item.familyId === familyId)
        setSelectedCatogory(result);
}, [Category, Family, familyId])
    return (
        Family &&
        <div style={{ height: "50px", display: "grid", gridTemplateColumns: "repeat(7,1fr)", backgroundColor: "#E2E2E2" }}>
            {Family.map(family => {
                return (
                    <div className='flexCenter pointer-cursor' style={{
                        backgroundColor: family.name === selectedFamily ? theme.palette.secondary.main : "inherit",
                        clipPath: selectedFamily !== Family[0].name ? "polygon(0% 0%, calc(100% - 35px) 0%, 100% 100%, 35px 100%)" : "polygon(0 0, 85% 0, 100% 100%, 0 100%)"
                    }} key={family.id} onMouseEnter={(event) => {
                        setSelectedFamily(family.name);
                        setAnchorEl(event.currentTarget);
                        setFamilyId(family.id)
                        }} onMouseLeave={() => { 
                            // setSelectedFamily(null); 
                            // setAnchorEl(null)
                            // setFamilyId(null)
                     }}>
                        <Typography color={selectedFamily === family.name ? "white" : "black"}>{family.name}</Typography>
                    </div>
                )
            })}
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    onClose={() => setAnchorEl(null)}
                    disableRestoreFocus
                >
                    {selectedCatogory?.map(item => {
                        return (
                            <div className='cursor-pointer' onMouseEnter={(event) => setAnchorEl(event.currentTarget)}>
                                <Box  sx={{ p: 2 }} style={{ borderBottom: "1px solid #E2E2E2"}}>
                                    <Typography className='cursor-pointer'>{item.name}</Typography>
                                </Box>
                            </div>
                        )
                    })}
                </Popover>
        </div >
    )
}
