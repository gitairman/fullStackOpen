import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice ({
    name: 'notification',
    initialState: '',
    reducers: {
        display(state, action) {
            return action.payload
        }
    }
})

export const { display } = notificationSlice.actions
export default notificationSlice.reducer