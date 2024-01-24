import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        display(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(display(message))
        setTimeout(() => { dispatch(display('')) }, 1000 * time)
    }
}

export const { display } = notificationSlice.actions
export default notificationSlice.reducer