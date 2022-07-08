import { createSlice } from '@reduxjs/toolkit'
import { produstsType } from './storeFrontslice'

type productsType = {
    product: produstsType | null
    Family: FamilyObjectType[] | null
}

const initialState: productsType = {
    product: null,
    Family: null
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setFamily: (state, action) => {
            state.Family = action.payload
        },

    },
})

export const { setProduct, setFamily } = productSlice.actions

export default productSlice.reducer


export interface UpdatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface FamilyObjectType {
    updatedAt: UpdatedAt;
    status: string;
    createdAt: CreatedAt;
    createdBy: string;
    updatedBy: string;
    id: string;
    name: string;
    index: number;
}