import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createNew(state, action) {
      const newItem = asObject(action.payload)
      state.push(newItem)
    },
    vote(state, action) {
      const id = action.payload
      const idx = state.findIndex(item => item.id === id)
      state[idx].votes = state[idx].votes + 1
    }
  }

})

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE':
//       const id = action.payload.a_id
//       const itemToChange = state.find((item) => {
//         return item.id === id
//       })
//       const updated = { ...itemToChange, votes: itemToChange.votes + 1 }
//       return state.map(item => {
//         return item.id !== id ? item : updated
//       })
//     case 'NEW':
//       const newItem = asObject(action.payload.content)
//       return [...state, newItem]

//     default:
//       return state
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       a_id: id
//     }
//   }
// }

// export const createNew = (content) => {

//   return {
//     type: 'NEW',
//     payload: {
//       content: content
//     }
//   }
// }

export const { createNew, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer