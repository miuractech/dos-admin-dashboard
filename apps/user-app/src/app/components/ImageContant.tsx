import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import reviews from "../components/images/reviews.svg"

export const ImageContant = () => {
    const { product } = useSelector((state: RootState) => state.product)
    return (
        product &&
        <div style={{ padding: "3% 3%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}>
                <div style={{
                    display: "grid",
                    gridTemplateRows: "repeat(8, auto)",
                    overflowY: "auto",
                    maxHeight: "530px"
                }}>
                    {product.sideImages.map(img => {
                        return (
                            <div>
                                <img src={img.url} alt="img" width="100%" />
                            </div>
                        )
                    })}
                    {product.sideImages.map(img => {
                        return (
                            <div>
                                <img src={img.url} alt="img" width="100%" />
                            </div>
                        )
                    })}
                </div>
                <div>
                    <img src={product.sideImages[0].url} alt="img" width="100%" />
                </div>
            </div>
            < div style={{ display: "grid", gridTemplateRows: "repeat(6,1fr" }}>
                <div>
                    <Typography fontWeight={600} variant='h5'>{product.productName}</Typography>
                    <img src={reviews} alt="reviews" />
                </div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div >
        </div >
    )
}
