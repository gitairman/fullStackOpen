import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addNew(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const id = action.payload.id
      return state.map(item => item.id === id ? action.payload : item)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }

})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(addNew(newAnecdote))
  }
}

export const vote = (id, updated) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, updated)
    dispatch(update(updatedAnecdote))
  }
}

export const { addNew, update, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer