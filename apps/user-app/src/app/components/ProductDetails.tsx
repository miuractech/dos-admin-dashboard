import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import SimpleAccordion from './Accordin'

export const ProductDetails = () => {
    const { product } = useSelector((state: RootState) => state.product)
    return (
        product &&
        <div>
            <SimpleAccordion heading="Product Details">
                <Typography>{product.resellerDescription}</Typography>
            </SimpleAccordion>
        </div>
    )
}
