import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})
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

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
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

  const handleBlogChange = ({ target }) => {
    const name = target.getAttribute('name')
    const newBlogObj = {}
    newBlogObj[name] = target.value

    setNewBlog({ ...newBlog, ...newBlogObj })
    console.log(newBlog)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    displayMessage({ type: 'info', message: `${user.username} was successfully logged out!` })
  }

  const addBlog = async () => {
    const savedBlog = await blogService.create(newBlog)
    console.log(savedBlog)
    setBlogs([...blogs, savedBlog])
  }

  const displayMessage = (messageToDisplay) => {
    setMessage(messageToDisplay)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} /><br />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Currently logged in as: {user.username}
      <button
        style={{ marginLeft: 5 }}
        onClick={handleLogout}>
        logout
      </button>
      <h3>Add New Blog</h3>
      <div>
        Title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleBlogChange}
        />
      </div><br />
      <div>
        Author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleBlogChange}
        />
      </div><br />
      <div>
        Url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleBlogChange}
        />
      </div><br />

      <button type="submit">add</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />

      {user === null ? loginForm() : blogForm()}

      <section>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

      </section>
    </div>
  )
}

export default App