const Comments = ({ blog }) => {
  if (!blog.comments) {
    return null
  }
  return (
  <div>
    {blog.comments.map(comment => <li key={comment.id}>{comment}</li>)}
    </div>
    )

}
