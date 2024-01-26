import { memo, useEffect } from 'react'
import { useLoggedIn } from '../loggedInContext'
import { useMutation } from '@tanstack/react-query'
import { deleteBlog, getAll, update } from '../services/blogs'
import { useBlogsDispatch } from '../blogsContext'
import { useMessageDispatch } from '../NotificationContext'
import { useUsersDispatch } from '../usersContext'
import Comments from './Comments'

const Blog = memo(({ blog, details }) => {
  const dispatchBlogs = useBlogsDispatch()
  const dispatchUsers = useUsersDispatch()

  useEffect(() => {
    (async () => {
      const initialBlogs = await getAll()
      dispatchBlogs({ type: 'set', payload: initialBlogs })
    })()
  }, [])

  const loggedIn = useLoggedIn()
  const dispatchMessage = useMessageDispatch()

  const blogStyle = {
    paddingLeft: 5,
    border: 'solid',
    borgerWidth: 1,
    marginBottom: 5,
  }

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedBlog) => {
      dispatchBlogs({ type: 'update', payload: updatedBlog })
      dispatchMessage({
        type: 'info',
        message: `Blog was UPDATED - ${updatedBlog.title} by ${updatedBlog.author}`,
      })
    },
    onError: (err) => {
      dispatchMessage({ type: 'error', message: err.response.data.error })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      dispatchBlogs({ type: 'remove', payload: blog.id })
      dispatchMessage({
        type: 'info',
        message: `Blog was DELETED - '${blog.title} by ${blog.author}`,
      })
    },
    onError: (err) => {
      dispatchMessage({ type: 'error', message: err.response.data.error })
    },
  })

  const handleLikeClick = (e) => {
    e.preventDefault()
    const updatedBlog = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    updateMutation.mutate(updatedBlog)
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    if (
      window.confirm(
        `Are you sure you want to DELETE blog post ${blog.title} by ${blog.author}?`
      )
    ) {
      deleteMutation.mutate(blog.id)
    }
  }

  const deleteBtn = () => {
    if (loggedIn !== null) {
      if (blog.user.username === loggedIn.username) {
        return <button onClick={handleDeleteClick}>delete blog</button>
      }
    }
  }

  const showDetails = () => (
    <>
      <dt>
        <strong>Author:</strong>
      </dt>{' '}
      <dd>{blog.author}</dd>
      <dt>
        <strong>Url:</strong>
      </dt>{' '}
      <dd>{blog.url}</dd>
      <dt>
        <strong>Likes:</strong>
      </dt>{' '}
      <dd>
        <span className="likes">{blog.likes}</span>
        <button onClick={handleLikeClick}>like</button>
      </dd>
      <dt>
        <strong>Added by User:</strong>{' '}
      </dt>
      <dd>{'user' in blog && blog.user.username}</dd>
      <div style={{ marginTop: 50 }}>
        <Comments blog={blog} />
      </div>
    </>
  )

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle} className="blog">
      <dl>
        <dt>
          <strong>Title:</strong>
        </dt>
        <dd style={details ? { fontSize: 30 } : { fontSize: 18 }}>
          {blog.title}
        </dd>
        {details && showDetails()}
        <br />
        {deleteBtn()}
      </dl>
    </div>
  )
})

Blog.displayName = 'Blog'

export default Blog
