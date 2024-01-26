import axios from 'axios'
const baseUrl = '/api/blogs'

export const getComments = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}/comments`)
  return res.data
}

export const addComment = async (commentObj) => {
  const id = commentObj.id
  console.log(commentObj.comment)
  const res = await axios.post(`${baseUrl}/${id}/comments`, {
    comment: commentObj.comment,
  })
  return res.data
}
