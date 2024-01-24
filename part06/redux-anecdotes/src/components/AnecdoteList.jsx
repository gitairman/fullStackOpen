import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter((item) => {
            return item.content.includes(filter)
        }).sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const handleVote = async (anecdote) => {
        const updatedAnecdote = {
            content: anecdote.content,
            votes: anecdote.votes + 1
        }
        console.log(updatedAnecdote)
        dispatch(vote(anecdote.id, updatedAnecdote))
        dispatch(setNotification(`You have just voted for '${anecdote.content}'`, 3))
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList