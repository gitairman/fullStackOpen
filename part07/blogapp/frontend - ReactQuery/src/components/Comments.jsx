import { useMutation } from '@tanstack/react-query'
import { addComment } from '../services/comments'
import { useState } from 'react'
import { useMessageDispatch } from '../NotificationContext'

const Comments = ({ blog }) => {
  const [newComment, setComment] = useState('')

  const dispatchMessage = useMessageDispatch()

  const comments = blog.comments

  const style = {
    marginRight: 10,
    marginBottom: 10,
  }

  const commentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (savedComment) => {
      dispatchMessage({
        type: 'info',
        message: `Successfully submitted comment '${savedComment.comment}'`,
      })
      setComment('')
      comments.push(savedComment)
    },
    onError: (err) => {
      dispatchMessage({ type: 'error', message: err.response.data.error })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    commentMutation.mutate({ id: blog.id, comment: newComment })
  }

  return (
    <div>
      <label style={style} htmlFor="comment">
        Add a comment:
      </label>
      <input
        style={style}
        id="comment"
        name="comment"
        type="text"
        value={newComment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      Comments:
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
