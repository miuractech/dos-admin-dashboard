import { Breadcrumbs, Button, Drawer, Typography } from '@mui/material'
import { ProductCardCart } from './ProductCardCart'
import { RootState } from '../../../store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLocalCart, cartProduct, localCart, setCartProducts } from '../../../store/cartSlice'
import { v4 as uuidv4 } from 'uuid';
import { OrderSummary } from './OrderSummary'
import { setNotification } from '../../../store/alertslice'
import SimpleModal from '@dropout-store/simple-modal'
import Lottie from "lottie-react";
import emptyBox from "./assets/emptyBox.json"
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InputField from '../../../UI/input-field/input-field'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import usePhoneAuth from '../../../features/auth/phoneAuthHook'
import { app } from '../../../configs/firebaseConfig'

const schema = yup.object().shape({
    phone: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(6000000000, 'enter valid phone number').max(9999999999, 'enter valid phone number').required('phone number is required')
})

export const Cart = () => {
    const { cartProductList, localCart } = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.User)
    const dispatch = useDispatch()
    const [productDelete, setProductDelete] = useState<string | null>(null)
    const [userDrawer, setUserDrawer] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const setCount = (id: string, productId: string, productSize: string) => {
        const copy = [...cartProductList]
        const productid = copy.filter(item => item.product.productId === productId)
        const size = productid.filter(item => item.size === productSize)
        const index = copy.findIndex(item => item === size[0])
        if (id === 'inc') {
            copy.splice(index, 1, {
                ...size[0],
                count: size[0].count + 1
            })
            // dispatch(setNotification(`You have changed ${size[0].product.productName} quantity to ${size[0].count + 1}`))
        } else if (id === 'dec') {
            copy.splice(index, 1, {
                ...size[0],
                count: size[0].count === 1 ? size[0].count : size[0].count - 1
            })
        }
        dispatch(setCartProducts(copy))
        const data = localStorage.getItem("cart")
        if (data) {
            const localData = JSON.parse(data)
            const productid = localData.filter((item: localCart) => item.productID === productId)
            const size = productid.filter((item: localCart) => item.size === productSize)
            const index = localData.findIndex((item: localCart) => item === size[0])
            if (id === 'inc') {
                localData.splice(index, 1, {
                    ...size[0],
                    count: size[0].count + 1
                })
            } else if (id === 'dec') {
                localData.splice(index, 1, {
                    ...size[0],
                    count: size[0].count === 1 ? size[0].count : size[0].count - 1
                })
            }
            dispatch(setLocalCart(localData))
        }
    }

    const delectProduct = (id: string) => {
        setProductDelete(id)
    }

    const deleteItem = (id: string) => {
        const copy1 = [...cartProductList]
        const copy2 = [...localCart]
        const result1 = copy1.filter(item => item.id !== id)
        const result2 = copy2.filter(item => item.id !== id)
        dispatch(setCartProducts(result1))
        dispatch(setLocalCart(result2))
        setProductDelete(null)
    }

    const saveLater = (id: string) => {
        console.log(id)
    }

    const { sendOtp } = usePhoneAuth(app)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(localCart))
    }, [localCart])

    const breadcrumbs = [
        <Link
            key="1"
            to=''
        >
            <Typography className='hover:underline text-blue-700' fontWeight={500} color="text.primary">
                Cart
            </Typography>
        </Link>,
        <Link
            key="2"
            to=''
        >
            <Typography className='hover:underline' fontWeight={500} color="text.primary">
                Shipping Method
            </Typography>
        </Link>,
        <Link to='' key="3">
            <Typography className='hover:underline' fontWeight={500} color="text.primary">
                Payment Method
            </Typography>
        </Link>
    ];

    return (
        cartProductList.length >= 1 ? (
            <>
                <div className='py-5 md:mx-24' >
                    <Breadcrumbs separator={<ChevronRightIcon color='primary' />} aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </div>
                <SimpleModal open={Boolean(productDelete)} onClose={() => setProductDelete(null)}>
                    <div className='flex flex-col gap-5 w-56 mt-5 md:w-96'>
                        <Typography textAlign="left" variant='h6'>Remove Item</Typography>
                        <Typography textAlign="left">Are you sure you want to remove this item?</Typography>
                        <div className='space-x-5 mt-5'>
                            <Button variant='outlined' onClick={() => setProductDelete(null)}>CANCEL</Button>
                            {productDelete && <Button variant='contained' onClick={() => deleteItem(productDelete)}>Delete</Button>}
                        </div>
                    </div>
                </SimpleModal>
                <div className='p-5 gap-5 space-y-5 md:grid grid-cols-3 md:mx-20'>
                    <div className='space-y-5 md:col-span-2'>
                        <Typography fontWeight={600} variant='h6'>My Bag</Typography>
                        {cartProductList.map((item: cartProduct) => <ProductCardCart
                            key={item.id}
                            id={item.id}
                            img={item.product.sideImages[0].url}
                            productName={item.product.productName}
                            productSize={item.size}
                            productPrice={item.product.price}
                            productCompPrice={item.product.comparePrice}
                            count={item.count}
                            productid={item.product.productId}
                            setCount={setCount}
                            delectProduct={delectProduct}
                            saveLater={saveLater}
                            reSellerId={item.product.resellerId}
                        />)}
                    </div>
                    <div className=''>
                        <Typography fontWeight={500} variant='h6'>Order Summary</Typography>
                        <OrderSummary />
                        <Button variant='contained' fullWidth onClick={() => {
                            if (user) {
                                console.log("add adress");
                            } else {
                                setUserDrawer(true)
                            }
                        }}>ADD ADDRESS</Button>
                    </div>
                </div>
                <Drawer anchor='left' open={userDrawer} onClose={() => setUserDrawer(false)}>
                    <div className='w-96'>
                        <form onSubmit={handleSubmit(data => sendOtp(`+91${data['phone']}`))} >
                            <InputField placeholder="phonenumber" forminput={{ ...register('phone') }} />
                            <Button type="submit" variant='contained'>get otp</Button>
                        </form>
                    </div>
                </Drawer>
            </>
        ) : (
            <div className='text-center mt-20'>
                <Typography variant='h6' fontWeight={500}>Your cart is empty!</Typography>
                <Typography>Add items to it now</Typography>
                <Lottie animationData={emptyBox} loop={true} className="h-60" />
                <Button variant='contained'>Shop Now</Button>
            </div>
        )
    )
}
