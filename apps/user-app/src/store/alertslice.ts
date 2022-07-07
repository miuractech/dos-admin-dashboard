import { createSlice } from '@reduxjs/toolkit'

type alertsType = {
    error: null | string
    notification: null | string
}

const initialState: alertsType = {
    error: null,
    notification: null
}

export const AlertSlice = createSlice({
    name: 'storeFront',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
        setNotification: (state, action) => {
            state.notification = action.payload
        },

    },
})

export const { setError, setNotification } = AlertSlice.actions

export default AlertSlice.reducer