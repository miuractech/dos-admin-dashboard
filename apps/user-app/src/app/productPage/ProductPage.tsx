import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Header } from './header/Header'
import { HeaderTop } from '../components/HeaderTop'
import { MobileContent } from '../components/MobileContent'
import { MobileHeader } from '../components/MobileHeader'
import { MobilePriceComponent } from '../components/PriceComponent'
import { MobileProductImages } from '../components/ProductImages'
import { NavBar } from '../components/NavBar'
import { ImageContant } from '../components/ImageContant'

const ProductPage = () => {
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("sm"))
    return (
        <div>
            <HeaderTop />
            {media ?
                (
                    <>
                        <Header />
                        <NavBar />
                        <ImageContant />
                    </>
                )
                :
                (
                    <>
                        <MobileHeader />
                        <MobileProductImages />
                        <MobilePriceComponent />
                        <MobileContent />
                    </>
                )}
        </div>
    )
}

export default ProductPage
