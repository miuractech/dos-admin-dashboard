import { createSlice } from '@reduxjs/toolkit'
import { Timestamp } from 'firebase/firestore'
import { produstsType } from './storeFrontslice'

export type cartProduct = {
    product: produstsType
    size: string,
    count: number,
    id: string
}

export interface addressType {
    phone: number;
    city: string;
    pincode: number;
    email: string;
    lastName: string;
    firstName: string;
    country: string;
    address: string;
    timeStamp?: Timestamp;
    id: string;
}

export type localCart = {
    productID: string,
    size: string,
    count: number,
    resellerId: string
    id: string
}

type cartType = {
    cartProductList: cartProduct[],
    localCart: localCart[]
    addresses: addressType[]
}

const initialState: cartType = {
    cartProductList: [],
    localCart: [],
    addresses:[]
}

export const CartSlice = createSlice({
    name: 'cartProducts',
    initialState,
    reducers: {
        addCartProducts: (state, action) => {
            state.cartProductList.push(action.payload)
        },
        setLocalCart: (state, action) => {
            state.localCart = action.payload
        },
        setCartProducts: (state, action) => {
            state.cartProductList = action.payload
        },
        addLocalCart: (state, action) => {
            state.localCart.push(action.payload)
        },
        setAddress: (state, action) => {
            state.addresses = action.payload
        },
        addAddress: (state, action) => {
            state.addresses.push(action.payload)
        },
    },
})

export const { addCartProducts, setLocalCart, setCartProducts, addLocalCart, setAddress, addAddress } = CartSlice.actions

export default CartSlice.reducer