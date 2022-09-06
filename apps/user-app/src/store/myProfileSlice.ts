
import { createSlice } from '@reduxjs/toolkit'

type myProfileType = {
  whishListProducts:any[]
}

const initialState: myProfileType = {
whishListProducts:[]
}

export const myProfileSlice = createSlice({
    name: 'Myprofile',
    initialState,
    reducers: {
        addWishListProducts: (state, action) => {
            state.whishListProducts.push(action.payload)
        }
    },
})

export const { addWishListProducts } = myProfileSlice.actions

export default myProfileSlice.reducer