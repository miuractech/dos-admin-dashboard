import { createSlice } from '@reduxjs/toolkit'
import { produstsType } from './storeFrontslice'

type productsType = {
    product: produstsType | null
}

const initialState: productsType = {
    product: null,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        }

    },
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer