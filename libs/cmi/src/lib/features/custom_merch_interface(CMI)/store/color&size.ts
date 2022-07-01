// import { createSlice } from '@reduxjs/toolkit'

// // Define a type for the slice state



// // Define the initial state using that type
// const initialState: colorState = {
    
// }

// export const selectSlice = createSlice({
//     name: 'select',
//     // `createSlice` will infer the state type from the `initialState` argument
//     initialState,
//     reducers: {
//         choosenColor: (state, action) => {
//             state.selectedColor = action.payload

//         },
//     },
// })

// export const { choosenColor } = selectSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// // export const selectCount = (state: RootState) => state.counter.value

// export default selectSlice.reducer