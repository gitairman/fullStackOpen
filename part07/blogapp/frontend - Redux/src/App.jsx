import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from './reducers/loggedInSlice'
import { initializeBlogs } from './reducers/blogsSlice'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Forms from './components/Forms'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      dispatch(setLoggedIn(user))
    } else {
      dispatch(setLoggedIn(null))
    }
  }, [dispatch])

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
