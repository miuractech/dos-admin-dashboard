import { createSlice } from '@reduxjs/toolkit'
import { Timestamp } from 'firebase/firestore'
import { OrderDetails } from '../app/components/payment/OrderConfirmation'
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
    productID: string
    size: string
    count: number
    resellerId: string
    userId?:string
    id: string
    img: string
    productName: string
    price:string
}

type cartType = {
    cartProductList: cartProduct[],
    localCart: localCart[]
    addresses: addressType[]
    selectedAddress: string | null
    orderId: string | null
    hash: string | null
    orderDetails: OrderDetails | null
    selectedAddressfull: null | addressType
}

const initialState: cartType = {
    cartProductList: [],
    localCart: [],
    addresses: [],
    selectedAddress: null,
    orderId: null,
    hash: null,
    orderDetails: null,
    selectedAddressfull:null
    
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
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload
        },
        setOrderId: (state, action) => {
            state.orderId = action.payload
        },
         setHash: (state, action) => {
            state.hash = action.payload
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload
        },
        setSelectedAddressfull: (state, action) => {
            state.selectedAddressfull = action.payload
        }
    },
})

export const { setSelectedAddressfull,setOrderDetails,setHash,addCartProducts, setOrderId, setLocalCart, setCartProducts, addLocalCart, setAddress, addAddress, setSelectedAddress } = CartSlice.actions

export default CartSlice.reducer