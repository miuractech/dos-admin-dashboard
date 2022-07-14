import { Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Header } from './header/Header'
import { HeaderTop } from '../components/HeaderTop'
import { MobileContent } from '../components/MobileContent'
import { MobileHeader } from '../components/MobileHeader'
import { MobilePriceComponent } from '../components/PriceComponent'
import { MobileProductImages } from '../components/ProductImages'
import { NavBar } from '../components/NavBar'
import { ImageContant } from '../components/ImageContant'
import { ProductDetails } from '../components/ProductDetails'
import { Ratings } from '../components/Ratings'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import ProductsCard from '../components/ProductsCard'
import { MobileAddCart } from '../components/MobileAddCart'

const ProductPage = () => {
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("sm"))
    const { productsList } = useSelector((state: RootState) => state.storeFront)
    const medium = useMediaQuery(theme.breakpoints.up("md"))

    const AddToCard = () => {
        console.log("added")
    }

    return (
        <div>
            {media ?
                (
                    <ImageContant AddToCard={AddToCard} />
                )
                :
                (
                    <>
                        <MobileProductImages />
                        <MobilePriceComponent />
                        <MobileContent />
                        <MobileAddCart AddToCard={AddToCard} />
                    </>
                )}
            <div className={medium ? 'grid grid-cols-2 mx-10 space-x-10' : "mx-10 grid gap-5"}>
                <ProductDetails />
                <Ratings />
            </div>
            <Typography className='py-10 text-center' variant='h5'>Recommended Products</Typography>
            {
                productsList && <div className={medium ? 'grid grid-cols-4 mx-20 gap-8' : 'grid gap-8'}>
                    {productsList.map(item => {
                        return (
                            <ProductsCard comparedPrice={item.comparePrice} images={item.sideImages} price={item.price} productName={item.productName} sizeArray={item.sizeAvailable} />
                        )
                    })}
                </div>
            }
        </div >
    )
}

export default ProductPage
