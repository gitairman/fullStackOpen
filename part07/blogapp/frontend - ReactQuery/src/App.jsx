import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import { useUsers } from './usersContext'
import { useBlogs } from './blogsContext'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Home from './components/Home'
import { memo } from 'react'

const App = memo(() => {

  const users = useUsers()
  const userMatch = useMatch('/users/:id')
  const user = userMatch ? users.find((user) => user.id === userMatch.params.id) : null

  const blogs = useBlogs()
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null

  return (
    <div className='container'>
      <Menu />
      <h1>Blog App</h1>
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserBlogs user={user} />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} details={true} />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>

      <div style={{ marginTop: 20 }}>
        <i>Blog App, Department of Aaron Hopkins 2024</i>
      </div>
    </div>
  )
})

App.displayName = 'App'

export default App
