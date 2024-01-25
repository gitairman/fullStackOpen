import axios from 'axios'
const baseUrl = '/api/login'

export const login = async (user) => {
  const res = await axios.post(baseUrl, user)
  return res.data
}
