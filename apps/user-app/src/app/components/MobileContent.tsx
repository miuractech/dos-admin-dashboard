import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import reviews from "./images/reviews.svg"

export const MobileContent = () => {
    const { product } = useSelector((state: RootState) => state.product)
    return (
        product &&
        <div style={{ display: "flex", padding: "10px", flexDirection: "column" }}>
            <div>
                <Typography fontWeight={500} variant="h5">{product.productName}</Typography>
                <img src={reviews} alt="reviews" width="140px" />
            </div>
        </div>
    )
}
