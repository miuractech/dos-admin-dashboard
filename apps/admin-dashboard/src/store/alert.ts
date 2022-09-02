import { createSlice } from '@reduxjs/toolkit'

type alertsType = {
    error: null | string
    notification: null | string
    warning: null | string
    backDrop: boolean
}

const initialState: alertsType = {
    error: null,
    notification: null,
    warning: null,
    backDrop: false
}

export const AlertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        seterror: (state, action) => {
            state.error = action.payload
        },
        setNotification: (state, action) => {
            state.notification = action.payload
        },
        setWarning: (state, action) => {
            state.warning = action.payload
        },
        setBackDrop: (state, action) => {
            state.backDrop = action.payload
        }
    },
})

export const { seterror, setNotification, setWarning, setBackDrop } = AlertSlice.actions

export default AlertSlice.reducer