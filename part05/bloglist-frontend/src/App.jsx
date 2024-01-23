import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blogObj)
      setBlogs([...blogs, savedBlog])
      displayMessage({ type: 'info', message: `New blog added - ${savedBlog.title} by ${savedBlog.author}` })
    } catch (err) {
      console.log(err)
      displayMessage({ type: 'error', message: err.response.data.error })
    }
  }

  const updateBlog = async (id, blogObj) => {
    try {
      const savedBlog = await blogService.update(id, blogObj)
      const updateIdx = blogs.findIndex(blog => blog.id === id)
      const updatedBlogs = [...blogs]
      updatedBlogs[updateIdx] = savedBlog
      console.log(savedBlog)
      setBlogs(updatedBlogs)
      displayMessage({ type: 'info', message: `Blog was UPDATED - ${savedBlog.title} by ${savedBlog.author}` })
    } catch (err) {
      console.log(err)
      displayMessage({ type: 'error', message: err.response.data.error })
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      displayMessage({ type: 'info', message: `Successfully logged in with ${username}!` })
    } catch (err) {
      console.log(err)
      displayMessage({ type: 'error', message: err.response.data.error })
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    displayMessage({ type: 'info', message: `${user.username} was successfully logged out!` })
  }

  const displayMessage = (messageToDisplay) => {
    setMessage(messageToDisplay)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />


      {user === null ? loginForm() :
        <>
          Currently logged in as: {user.username}
          <button
            style={{ marginLeft: 5, marginBottom: 10 }}
            onClick={handleLogout}>
            logout
          </button>
          {blogForm()}
        </>
      }

      <section>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={updateBlog} />
        )}

      </section>
    </div>
  )
}

export default App