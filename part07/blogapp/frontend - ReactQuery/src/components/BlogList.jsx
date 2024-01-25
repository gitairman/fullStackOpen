import { useBlogs } from '../blogsContext'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useBlogs()

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
