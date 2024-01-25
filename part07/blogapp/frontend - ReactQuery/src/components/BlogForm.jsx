import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { create } from '../services/blogs'
import { useMessageDispatch } from '../NotificationContext'
import { useBlogsDispatch } from '../blogsContext'

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

  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const dispatchMessage = useMessageDispatch()
  const dispatchBlogs = useBlogsDispatch()

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (createdBlog) => {
      dispatchBlogs({ type: 'append', payload: createdBlog })
      dispatchMessage({
        type: 'info',
        message: `New blog '${createdBlog.title}' has just been added`,
      })
      setTimeout(() => {
        dispatchMessage(null)
      }, 5000)
    },
    onError: (err) => {
      dispatchMessage({ type: 'error', message: err.response.data.error })
      setTimeout(() => {
        dispatchMessage(null)
      }, 5000)
    },
  })

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    newBlogMutation.mutate(newBlog)
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
