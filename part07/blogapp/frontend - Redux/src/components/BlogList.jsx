import { useSelector } from 'react-redux'
import { selectBlogs } from '../reducers/blogsSlice'
import { selectLoggedIn } from '../reducers/loggedInSlice'

import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(selectBlogs)
  const loggedIn = useSelector(selectLoggedIn)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addedBy={loggedIn} />
      ))}
    </div>
  )
}

export default BlogList
