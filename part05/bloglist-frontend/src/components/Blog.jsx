import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike }) => {
  console.log(blog)

  const [blogDetails, setBlogDetails] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borgerWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = async (e) => {
    e.preventDefault()
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    handleLike(blog.id, updatedBlog)
  }

  const blogDeets = () => (
    <>
    <strong>Author:</strong> {blog.author} <br />
    <strong>Url:</strong> {blog.url} <br />
    <strong>Likes:</strong> {blog.likes} <button onClick={handleLikeClick}>like</button><br />
    <strong>Added by User:</strong> {'user' in blog && blog.user.username}
    </>
  )
  
  return (
  <div style={blogStyle}>
    <strong>Title:</strong> {blog.title} <button onClick={() => setBlogDetails(!blogDetails)}>{blogDetails ? 'hide' : 'view'}</button><br />
    {blogDetails && blogDeets()}

  </div>  
)
}

export default Blog