import { createSlice } from '@reduxjs/toolkit'

type merchentType = {
    Coupons: any[]
}

const initialState: merchentType = {
    Coupons: []
}

export const couponsSlice = createSlice({
    name: 'Coupons',
    initialState,
    reducers: {
        setCouponsDetails: (state, action) => {
            state.Coupons = action.payload
        }
    },
})

export const { setCouponsDetails } = couponsSlice.actions

export default couponsSlice.reducer