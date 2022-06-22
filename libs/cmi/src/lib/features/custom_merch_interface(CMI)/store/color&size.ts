import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./store"

// Define a type for the slice state

type colorProps = {
    colorName: string
    colorCode: string
}

interface colorState {
    selectedColor: null | colorProps
}

// Define the initial state using that type
const initialState: colorState = {
    selectedColor: null
}

export const selectSlice = createSlice({
    name: 'select',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        choosenColor: (state, action) => {
            state.selectedColor = action.payload

        },
    },
})

export const { choosenColor } = selectSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default selectSlice.reducer