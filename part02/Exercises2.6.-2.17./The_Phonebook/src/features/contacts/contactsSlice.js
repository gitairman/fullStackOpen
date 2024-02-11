import { createSlice } from '@reduxjs/toolkit'
import personsService from '../../services/personsService'
import { setTempNotify } from '../notify/notifySlice'

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addNew: (state, action) => [...state, action.payload],
    update: (state, action) =>
      state.map((i) => (i.id === action.payload.id ? action.payload : i)),
    remove: (state, action) => state.filter((i) => i.id !== action.payload),
    setList: (state, action) => action.payload,
  },
})

export const initList = (user) => {
  return async (dispatch) => {
    const initialList = await personsService.getAll()
    dispatch(setList(initialList.filter((c) => c.addedBy === user.sub)))
  }
}

export const createNew = (contact) => {
  return async (dispatch) => {
    const newContact = await personsService.create(contact)
    dispatch(addNew(newContact))
    dispatch(
      setTempNotify(
        'info',
        `New contact ${newContact.name} was successfully added!`
      )
    )
  }
}

export const editContact = (id, editedContact) => {
  return async (dispatch) => {
    const updatedContact = await personsService.update(id, editedContact)
    dispatch(update(updatedContact))
  }
}

export const removeContact = (id) => {
  return async (dispatch) => {
    await personsService.deletePerson(id)
    dispatch(remove(id))
  }
}

export const selectContacts = (state) => state.contacts
export const { addNew, update, remove, setList } = contactsSlice.actions
export default contactsSlice.reducer
