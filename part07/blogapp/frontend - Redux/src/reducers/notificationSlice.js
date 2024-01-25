import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    display: (state, action) => {
      return action.payload
    },
  },
})

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(display(message))
    setTimeout(() => {
      dispatch(display(null))
    }, 4000)
  }
}

export const { display } = notificationSlice.actions
export const selectMessage = (state) => state.notification
export default notificationSlice.reducer
