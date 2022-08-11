import { Box,  Container,  Divider,  Menu,  MenuItem,  Popover, Typography, useTheme } from '@mui/material'
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
    const [over, setOver] = useState(false)

    useEffect(() => {
        if (!Category)return
        const result = Category.filter(item => item.familyId === familyId)
        setSelectedCatogory(result);
        const result2 = subCategory?.filter(item => item.familyId === familyId)
        // console.log(result2);
    }, [Category, Family, familyId])
    console.log(subCategory);
    
    return (
        Family &&
        <>
            <div style={{ height: "50px", display: "grid", gridTemplateColumns: "repeat(7,1fr)", backgroundColor: "#E2E2E2", position:'relative' }}>
                {Family.map(family => {
                    return (
                        <div className='flexCenter pointer-cursor' style={{
                            backgroundColor: family.name === selectedFamily ? theme.palette.secondary.main : "inherit",
                            clipPath: selectedFamily !== Family[0].name ? "polygon(0% 0%, calc(100% - 35px) 0%, 100% 100%, 35px 100%)" : "polygon(0 0, 85% 0, 100% 100%, 0 100%)"
                        }} key={family.id} onMouseEnter={(event) => {
                            setSelectedFamily(family.name);
                            setAnchorEl(event.currentTarget);
                            setFamilyId(family.id)
                            setOver(true)
                        }} onMouseLeave={() => {
                            setSelectedFamily(null);
                            setAnchorEl(null)
                            setFamilyId(null)
                            setOver(false)
                        }}>
                            <Typography color={selectedFamily === family.name ? "white" : "black"}>{family.name}</Typography>
                        </div>
                    )
                })}
            </div >
                {over && <div className='p-5 bg-white w-full absolute'>
                <Box className='grid grid-cols-8'>
                    {selectedCatogory?.map(item => {
                        return (
                                <Box sx={{ p: 1 }} style={{ borderBottom: "1px solid #E2E2E2" }}>
                                <Typography className='cursor-pointer mb-3' fontWeight={500}>{item.name}</Typography>
                                {subCategory?.map(item2 => {
                                    return (
                                        <div>
                                            {item.id === item2.categoryId &&<Typography className="text-gray-600 p-1 hover:underline" variant='subtitle2'>{item2.name}</Typography>}
                                        </div>
                                    )
                                })}
                                </Box>
                        )
                    })}
                </Box>
            </div>}
        </>
    )
}

 <div className='cursor-pointer'>
   
</div> 