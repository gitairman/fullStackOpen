import { configureStore } from '@reduxjs/toolkit'

import contactsReducer from '../features/contacts/contactsSlice'
import notifyReducer from '../features/notify/notifySlice'
import filterReducer from '../features/filter/filterSlice'

export default configureStore({
  reducer: {
    notify: notifyReducer,
    contacts: contactsReducer,
    filter: filterReducer,
  },
})
