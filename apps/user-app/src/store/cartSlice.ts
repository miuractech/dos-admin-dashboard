import { createSlice } from '@reduxjs/toolkit'
import { produstsType } from './storeFrontslice'

export type cartProduct = {
    product: produstsType
    size: string,
    count: number,
    id: string
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
}

const initialState: cartType = {
    cartProductList: [],
    localCart: []
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
        }
    },
})

export const { addCartProducts, setLocalCart, setCartProducts, addLocalCart } = CartSlice.actions

export default CartSlice.reducer