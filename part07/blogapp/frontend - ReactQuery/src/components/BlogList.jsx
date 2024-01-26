import { useEffect, useRef } from 'react'
import { useBlogs, useBlogsDispatch } from '../blogsContext'
import { getAll } from '../services/blogs'
import Blog from './Blog'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useLoggedIn } from '../loggedInContext'

const BlogList = () => {
  const blogs = useBlogs()
  const dispatchBlogs = useBlogsDispatch()
  const loggedIn = useLoggedIn()

  useEffect(() => {
    ;(async () => {
      const initialBlogs = await getAll()
      initialBlogs.sort((a, b) => b.likes - a.likes)
      dispatchBlogs({ type: 'set', payload: initialBlogs })
    })()
  }, [dispatchBlogs])

  const blogFormRef = useRef()

  return (
    <div>
      {loggedIn && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      )}
      <h2>List of all blogs</h2>
      {blogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <Blog blog={blog} details={false} />
        </Link>
      ))}
    </div>
  )
}

export default BlogList
