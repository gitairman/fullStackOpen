import { useState } from 'react'
import { createNew } from '../reducers/blogsSlice'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const useField = (type, id) => {
    const name = id
    const placeholder = `write ${name} here`
    const [value, setValue] = useState('')

    const onChange = (e) => {
      setValue(e.target.value)
    }

    const onReset = () => {
      setValue('')
    }

    return {
      id,
      name,
      placeholder,
      type,
      value,
      onChange,
      onReset,
    }
  }

  const dispatch = useDispatch()

  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    console.log(newBlog)
    dispatch(createNew(newBlog))
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <form onSubmit={addBlog}>
      <h3 style={{ marginTop: 0 }}>Add New Blog</h3>
      <div>
        Title:
        <input {...title} />
      </div>
      <br />
      <div>
        Author:
        <input {...author} />
      </div>
      <br />
      <div>
        Url:
        <input {...url} />
      </div>
      <br />

      <button id="addBlogBtn" type="submit">
        add
      </button>
    </form>
  )
}

export default BlogForm
