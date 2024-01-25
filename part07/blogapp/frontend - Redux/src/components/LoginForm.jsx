import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loggedInSlice'
import { setErrorNotification } from '../reducers/notificationSlice'

const LoginForm = () => {
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
  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username.value, password.value)

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      username.onReset()
      password.onReset()
    } catch (err) {
      console.log(err)
      dispatch(setErrorNotification(err.response.data.error))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input {...username} />
        <br />
      </div>
      <div>
        password:
        <input {...password} />
      </div>
      <br />
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
