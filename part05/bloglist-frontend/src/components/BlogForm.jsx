import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const initBlogState = {
    title: '',
    author: '',
    url: '',
  }

  const [newBlog, setNewBlog] = useState(initBlogState)

  const handleBlogChange = ({ target }) => {
    const name = target.getAttribute('name')
    const newBlogObj = {}
    newBlogObj[name] = target.value

    setNewBlog({ ...newBlog, ...newBlogObj })
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog(newBlog)
    setNewBlog(initBlogState)
  }

  return (
    <form onSubmit={addBlog}>
      <h3 style={{ marginTop: 0 }} >Add New Blog</h3>
      <div>
                Title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleBlogChange}
          placeholder='write title here'
        />
      </div><br />
      <div>
                Author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleBlogChange}
          placeholder='write author here'
        />
      </div><br />
      <div>
                Url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleBlogChange}
          placeholder='write url here'
        />
      </div><br />

      <button type="submit">add</button>
    </form>
  )
}

export default BlogForm