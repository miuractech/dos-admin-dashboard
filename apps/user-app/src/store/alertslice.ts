import { createSlice } from '@reduxjs/toolkit'

type alertsType = {
    error: null | string
    notification: null | string
    warning: null | string
}

const initialState: alertsType = {
    error: null,
    notification: null,
    warning: null
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
        setWarning: (state, action) => {
            state.warning = action.payload
        },

    },
})

export const { setError, setNotification, setWarning } = AlertSlice.actions

export default AlertSlice.reducer