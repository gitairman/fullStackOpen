import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: { type: 'name', filter: '' },
  reducers: {
    filter: (state, action) => {
      return action.payload
    },
  },
})

export const setFilter = (newFilter) => {
  return async (dispatch) => {
    dispatch(filter(newFilter))
  }
}

export const selectFilter = (state) => state.filter
export const { filter } = filterSlice.actions
export default filterSlice.reducer
