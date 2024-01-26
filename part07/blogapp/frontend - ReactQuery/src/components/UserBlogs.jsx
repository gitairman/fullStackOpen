import { Link, useParams } from 'react-router-dom'
import { useUsers, useUsersDispatch } from '../usersContext'
import { memo, useEffect } from 'react'
import { getAllUsers } from '../services/users'
import { useBlogs, useBlogsDispatch } from '../blogsContext'
import { getAll } from '../services/blogs'
import { useQuery } from '@tanstack/react-query'

const UserBlogs = memo(({ user }) => {
  const blogs = useBlogs()
  const dispatchBlogs = useBlogsDispatch()
  const dispatchUsers = useUsersDispatch()

  useEffect(() => {
    (async () => {
      const initialUsers = await getAllUsers()
      dispatchUsers({ type: 'set', payload: initialUsers })
    })()
  }, [dispatchUsers])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>User - {user.name}</h2>
      <h3>Blogs added:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
})

UserBlogs.displayName = 'UserBlogs'

export default UserBlogs
