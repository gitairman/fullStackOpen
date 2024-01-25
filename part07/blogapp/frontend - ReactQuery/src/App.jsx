import { useEffect } from 'react'
import Notification from './components/Notification'
import { getAll, setToken, update } from './services/blogs'
import { useBlogsDispatch } from './blogsContext'
import { useLoggedInDispatch } from './loggedInContext'
import BlogList from './components/BlogList'
import Forms from './components/Forms'

const App = () => {
  const dispatchBlogs = useBlogsDispatch()
  const dispatchLogin = useLoggedInDispatch()

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
