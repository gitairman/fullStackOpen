import { memo, useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm.js'
import { useApolloClient } from '@apollo/client'

const App = memo(() => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

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
