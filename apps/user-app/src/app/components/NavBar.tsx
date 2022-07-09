import { Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export const NavBar = () => {
    const { Family } = useSelector((state: RootState) => state.product)
    const [over, setOver] = useState(false)
    const [selectedFamily, setSelectedFamily] = useState(Family && Family[0].name)
    const theme = useTheme()
    return (
        Family &&
        <div style={{ height: "50px", display: "grid", gridTemplateColumns: "repeat(7,1fr)", backgroundColor: "#E2E2E2" }}>
            {Family.map(family => {
                return (
                    <div className='flexCenter pointer-cursor' style={{
                        backgroundColor: family.name === selectedFamily ? theme.palette.secondary.main : "inherit",
                        clipPath: selectedFamily !== Family[0].name ? "polygon(0% 0%, calc(100% - 35px) 0%, 100% 100%, 35px 100%)" : "polygon(0 0, 85% 0, 100% 100%, 0 100%)"
                    }} key={family.id} onMouseEnter={() => { setOver(true); setSelectedFamily(family.name) }} onMouseLeave={() => setOver(false)}>
                        <Typography color={selectedFamily === family.name ? "white" : "black"}>{family.name}</Typography>
                    </div>
                )
            })}
        </div >
    )
}
