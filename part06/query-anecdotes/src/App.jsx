import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'
import { useMessageDispatch } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useMessageDispatch()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(item => 
        updatedAnecdote.id !== item.id ? item : updatedAnecdote
      ))
      dispatch(`You just voted for '${updatedAnecdote.content}'`)
      setTimeout(() => {
        dispatch('')
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    anecdote.votes++
    voteAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
