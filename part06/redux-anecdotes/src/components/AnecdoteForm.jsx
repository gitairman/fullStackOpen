import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { display } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNew = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(createNew(content))
        dispatch(display(`You have just added: ${content}`))
        setTimeout(() => {
            dispatch(display(''))
        }, 3000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>

    )


}


export default AnecdoteForm