import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setInfoNotification } from './notificationSlice'

const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: null,
  reducers: {
    setLoggedIn: (state, action) => {
      return action.payload
    },
  },
})

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch(setLoggedIn(user))
    dispatch(setInfoNotification(`${user.username} was successfully logged in!`))
  }
}

export const logoutUser = (user) => {
  return async (dispatch) => {
    dispatch(setLoggedIn(null))
    dispatch(setInfoNotification(`${user.username} was successfully logged out!`))
  }
}

export const selectLoggedIn = (state) => state.loggedIn
export const { setLoggedIn } = loggedInSlice.actions
export default loggedInSlice.reducer
