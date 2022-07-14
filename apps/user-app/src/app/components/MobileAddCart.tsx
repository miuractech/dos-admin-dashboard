import React from 'react'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Typography } from '@mui/material';

export const MobileAddCart = ({ AddToCard }: { AddToCard: () => void }) => {
    return (
        <div className='grid grid-cols-4 h-14 border-solid border-gray-300 bottom-0 fixed bg-white w-screen z-10'>
            <div className='flex justify-center items-center'>
                <IconButton><FavoriteOutlinedIcon color='error' /></IconButton>
            </div>
            <div className='flex justify-center items-center'>
                <IconButton><ShareIcon /></IconButton>
            </div>
            <div className='col-span-2 text-white flex justify-center items-center' style={{ backgroundColor: "#FF002E" }} onClick={AddToCard}>
                <Typography fontWeight={500}>ADD TO CART</Typography>
            </div>
        </div>
    )
}
