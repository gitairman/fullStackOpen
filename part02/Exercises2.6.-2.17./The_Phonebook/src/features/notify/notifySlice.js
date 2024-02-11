import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
  name: 'notify',
  initialState: null,
  reducers: {
    display: (state, action) => {
      return action.payload
    },
  },
})

export const setTempNotify = (type = 'info', msg) => {
  return async (dispatch) => {
    dispatch(display({ type, msg }))
    setTimeout(() => {
      dispatch(display(null))
    }, 4000)
  }
}

export const setPermNotify = (type = 'info', msg) => {
  return async (dispatch) => {
    dispatch(display({ type, msg }))
  }
}

export const { display } = notifySlice.actions
export const selectMsg = (state) => state.notify
export default notifySlice.reducer
