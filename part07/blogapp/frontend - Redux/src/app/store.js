import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from '../reducers/blogsSlice'
import notificationReducer from '../reducers/notificationSlice'
import loggedInReducer from '../reducers/loggedInSlice'

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    loggedIn: loggedInReducer,
    notification: notificationReducer,
  },
})
