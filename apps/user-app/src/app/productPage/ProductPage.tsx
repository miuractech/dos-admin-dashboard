import { Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import ProductsCard from '../components/ProductsCard'
import { MobileAddCart } from '../components/MobileAddCart'
import { setCartProducts, setLocatCart } from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom'
import { setNotification, setWarning } from '../../store/alertslice'

type cartProduct = {
    productId: string
    size: string
}

const ProductPage = () => {
    const [size, setSize] = useState<string | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("sm"))
    const { productsList } = useSelector((state: RootState) => state.storeFront)
    const medium = useMediaQuery(theme.breakpoints.up("md"))
    const { product } = useSelector((state: RootState) => state.product)

    const AddToCard = () => {
        if (!product) return
        if (size) {
            const localCart = {
                productID: product.productId,
                size: size,
                count: 1
            }
            dispatch(setCartProducts({
                product: product,
                size: size
            }))
            dispatch(setLocatCart(localCart))
            dispatch(setNotification("Item added to cart"))
            navigate("/cart")
        } else {
            dispatch(setWarning("Please select a Size to proceed"))
        }
    }

    return (
        <div>
            {media ?
                (
                    <ImageContant AddToCard={AddToCard} setSize={setSize} />
                )
                :
                (
                    <>
                        <MobileProductImages />
                        <MobilePriceComponent setSize={setSize} />
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
                            <ProductsCard key={item.productId} comparedPrice={item.comparePrice} images={item.sideImages} price={item.price} productName={item.productName} sizeArray={item.sizeAvailable} />
                        )
                    })}
                </div>
            }
        </div >
    )
}

export default ProductPage
