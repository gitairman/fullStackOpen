import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createAnecdote = async newAnecdote => {
    const res = await axios.post(baseUrl, newAnecdote)
    return res.data
}

export const voteAnecdote = async (votedAnecdote) => {
    const res = axios.put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote)
    return res.data
}