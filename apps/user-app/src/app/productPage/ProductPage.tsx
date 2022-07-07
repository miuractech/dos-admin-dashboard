import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Header } from '../components/Header'
import { HeaderTop } from '../components/HeaderTop'
import { MobileHeader } from '../components/MobileHeader'
import { ProductImages } from '../components/ProductImages'

const ProductPage = () => {
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("sm"))
    return (
        <div>
            <HeaderTop />
            {media ?
                (
                    <Header />
                )
                :
                (
                    <>
                        <MobileHeader />
                        <ProductImages />
                    </>
                )}
        </div>
    )
}

export default ProductPage
