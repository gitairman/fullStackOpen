import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { create, getAll, setToken, update } from './services/blogs'
import { useBlogs, useBlogsDispatch } from './blogsContext'
import { useLoggedIn, useLoggedInDispatch } from './loggedInContext'
import BlogList from './components/BlogList'
import Forms from './components/Forms'

const App = () => {
  const dispatchBlogs = useBlogsDispatch()
  const blogs = useBlogs()

  const dispatchLogin = useLoggedInDispatch()
  const user = useLoggedIn()

  useEffect(() => {
    (async () => {
      const initialBlogs = await getAll()
      initialBlogs.sort((a, b) => b.likes - a.likes)
      dispatchBlogs({ type: 'set', payload: initialBlogs })
    })()
  }, [dispatchBlogs])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setToken(user.token)
      dispatchLogin(user)
    }
  }, [dispatchLogin])

  const displayMessage = (messageToDisplay) => {
    setMessage(messageToDisplay)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Forms />
      <BlogList />
    </div>
  )
}

export default App
