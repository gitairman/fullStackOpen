import { memo, useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm.js'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries.js'

const App = memo(() => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({data, client}) => {
      const addedBook = data.data.bookAdded
      alert(`new book '${addedBook.title}' was added to the library`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    if (userToken && token === null) {
      setToken(userToken)
    } 
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')} >authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}  style={{display: token ? 'none': ''}}>login</button>
        <button onClick={() => logout()} style={{display: token ? '': 'none'}}>LOGOUT</button>
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} token={token} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage}/>

    </div>
  )
})

export default App
