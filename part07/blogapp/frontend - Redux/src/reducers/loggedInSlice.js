import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

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
    const loggedIn = await loginService.login(user)
    dispatch(setLoggedIn(loggedIn))
  }
}

export const selectLoggedIn = (state) => state.loggedIn
export const { setLoggedIn } = loggedInSlice.actions
export default loggedInSlice.reducer
