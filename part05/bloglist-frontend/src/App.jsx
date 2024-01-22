import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleBlogChange = ({target}) => {
    const name = target.getAttribute('name')
    const newBlogObj = {}
    newBlogObj[name] = target.value

    setNewBlog({...newBlog, ...newBlogObj})
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

  const addBlog = async () => {
    const savedBlog = await blogService.create(newBlog)
    console.log(savedBlog)
    setBlogs([...blogs, savedBlog])
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <p>Currently logged in as: {user.username}</p>
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

      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>

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