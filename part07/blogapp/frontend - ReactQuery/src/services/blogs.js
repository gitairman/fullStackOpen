import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

export const update = async (updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    config
  )
  return res.data
}

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}
