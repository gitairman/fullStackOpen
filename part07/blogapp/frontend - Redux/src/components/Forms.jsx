import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, selectLoggedIn, setLoggedIn } from '../reducers/loggedInSlice'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Forms = () => {
  const loggedIn = useSelector(selectLoggedIn)
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(logoutUser(loggedIn))
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <>
      {loggedIn === null ? (
        loginForm()
      ) : (
        <>
          Currently logged in as: {loggedIn.username}
          <button
            id="logout-button"
            style={{ marginLeft: 5, marginBottom: 10 }}
            onClick={handleLogout}
          >
            logout
          </button>
          {blogForm()}
        </>
      )}
    </>
  )
}

export default Forms
