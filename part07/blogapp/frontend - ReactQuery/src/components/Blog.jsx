import { useState } from 'react'
import { useLoggedIn } from '../loggedInContext'
import { useMutation } from '@tanstack/react-query'
import { deleteBlog, update } from '../services/blogs'
import { useBlogsDispatch } from '../blogsContext'
import { useMessageDispatch } from '../NotificationContext'

const Blog = ({ blog }) => {
  const loggedIn = useLoggedIn()

  const dispatchBlogs = useBlogsDispatch()
  const dispatchMessage = useMessageDispatch()

  const [blogDetails, setBlogDetails] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
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

  const blogDeets = () => (
    <>
      <strong>Url:</strong> {blog.url} <br />
      <strong>Likes:</strong> <span className="likes">{blog.likes}</span>{' '}
      <button onClick={handleLikeClick}>like</button>
      <br />
      <strong>Added by User:</strong> {'user' in blog && blog.user.username}
      <br />
      {deleteBtn()}
    </>
  )

  return (
    <div style={blogStyle} className="blog">
      <strong>Title:</strong> {blog.title}{' '}
      <button
        className="blogDetails"
        onClick={() => setBlogDetails(!blogDetails)}
      >
        {blogDetails ? 'hide' : 'view'}
      </button>
      <br />
      <strong>Author:</strong> {blog.author} <br />
      {blogDetails && blogDeets()}
    </div>
  )
}

export default Blog
