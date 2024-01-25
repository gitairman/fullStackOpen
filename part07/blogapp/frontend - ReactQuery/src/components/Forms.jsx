import { useRef } from 'react'
import { useLoggedIn, useLoggedInDispatch } from '../loggedInContext'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useMessageDispatch } from '../NotificationContext'

const Forms = () => {
  const loggedIn = useLoggedIn()
  const dispatchLogin = useLoggedInDispatch()
  const dispatchMessage = useMessageDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatchLogin(null)
    dispatchMessage({
      type: 'info',
      message: `${loggedIn.username} was successfully logged out!`,
    })
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
    <div>
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
    </div>
  )
}

export default Forms
