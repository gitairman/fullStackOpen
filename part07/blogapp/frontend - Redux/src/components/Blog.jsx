import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogsSlice'

const Blog = ({ blog, addedBy }) => {
  const dispatch = useDispatch()

  const [blogDetails, setBlogDetails] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borgerWidth: 1,
    marginBottom: 5,
  }

  const handleLikeClick = (e) => {
    e.preventDefault()
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    if (
      window.confirm(
        `Are you sure you want to DELETE blog post ${blog.title} by ${blog.author}?`
      )
    ) {
      dispatch(removeBlog(blog.id))
    }
  }

  const deleteBtn = () => {
    if (addedBy !== null) {
      if (blog.user.username === addedBy.username) {
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
