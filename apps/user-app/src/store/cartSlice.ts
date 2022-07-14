import { createSlice } from '@reduxjs/toolkit'
import { produstsType } from './storeFrontslice'

type cartType = {
    cartProductList: produstsType[] | null
}

const initialState: cartType = {
    cartProductList: null
}

export const CartSlice = createSlice({
    name: 'cartProducts',
    initialState,
    reducers: {
        setCartProducts: (state, action) => {
            state.cartProductList = action.payload
        }
    },
})

export const { setCartProducts } = CartSlice.actions

export default CartSlice.reducer