import { Breadcrumbs, Button, Drawer, Typography } from '@mui/material'
import { ProductCardCart } from './ProductCardCart'
import { RootState } from '../../../store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLocalCart, cartProduct, localCart, setCartProducts } from '../../../store/cartSlice'
import { v4 as uuidv4 } from 'uuid';
import { OrderSummary } from './OrderSummary'
import { setBackDrop, setError, setNotification } from '../../../store/alertslice'
import SimpleModal from '@dropout-store/simple-modal'
import Lottie from "lottie-react";
import emptyBox from "./assets/emptyBox.json"
import { GetPhoneNumber } from './GetPhoneNumber'
import { GetOTP } from './GetOTP'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../configs/firebaseConfig'

export const Cart = () => {
    const { cartProductList, localCart, orderId, hash, orderDetails, selectedAddressfull } = useSelector((state: RootState) => state.cart)
    const { user, step } = useSelector((state: RootState) => state.User)
    const dispatch = useDispatch()
    const [productDelete, setProductDelete] = useState<string | null>(null)
    const [userDrawer, setUserDrawer] = useState(false)
    const navigate = useNavigate()
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

    const deleteItem = async (id: string) => {
        try {
            dispatch(setBackDrop(true))
            const copy1 = [...cartProductList]
            const copy2 = [...localCart]
            const result1 = copy1.filter(item => item.id !== id)
            const result2 = copy2.filter(item => item.id !== id)
            dispatch(setCartProducts(result1))
            dispatch(setLocalCart(result2))
            if (!user) {
                dispatch(setBackDrop(false))
                setProductDelete(null)
            } else {
                const deleteRef = doc(db, "cart", user.uid);
                await updateDoc(deleteRef, {
                    items: result2
                });
                setProductDelete(null)
                dispatch(setBackDrop(false))
            }
        } catch (error) {
            dispatch(setError("Error deleting item from product"))
            dispatch(setBackDrop(false))
        }
    }

    const saveLater = (id: string) => {
        console.log(id)
    }
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(localCart))
    }, [localCart])

    useEffect(() => {
        if (!user) return
        setUserDrawer(false)
}, [user])


    return (
        cartProductList.length >= 1 ? (
            <>
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
                <div className='p-5 gap-5 md:grid grid-cols-3 md:mx-20'>
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
                        <Button variant='contained' fullWidth onClick={async () => {
                            try {
                                if (user) {
                                    const local = localStorage.getItem("cart")
                                    if (!local) return
                                    const data: localCart[] = JSON.parse(local)
                                    const ref = doc(db, "cart", user.uid)
                                    if (orderId) {
                                        await setDoc(ref, {
                                            items: data,
                                            orderid: orderId
                                        })
                                    } else {
                                        await setDoc(ref, {
                                            items: data,
                                        })
                                    }
                                    navigate('/cart/shippingmethod')
                                } else {
                                    setUserDrawer(true)
                                }
                            } catch (error) {
                                console.log(error)
                                dispatch(setError("Error adding products"))
                            }
                        }}>ADD ADDRESS</Button>
                    </div>
                </div>
                <Drawer anchor='left' open={userDrawer} onClose={() => setUserDrawer(false)}>
                    {step === 'phone' ? (<GetPhoneNumber />) : (<GetOTP />)}
                    
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