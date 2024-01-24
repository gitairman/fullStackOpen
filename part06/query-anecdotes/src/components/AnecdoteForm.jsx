import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useMessageDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useMessageDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(createdAnecdote))
      dispatch(`New anecdote '${createdAnecdote.content}' has just been added`)
      setTimeout(() => {
        dispatch('')
      }, 5000)
    },
    onError: (err) => {
      dispatch('ERROR:  ' + err.response.data.error)
      setTimeout(() => {
        dispatch('')
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
