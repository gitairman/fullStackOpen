import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../reducers/loggedInSlice'
import { setNotification } from '../reducers/notificationSlice'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedIn(user))
      setUsername('')
      setPassword('')
      dispatch(
        setNotification({
          type: 'info',
          message: `Successfully logged in with ${username}!`,
        })
      )
    } catch (err) {
      console.log(err)
      dispatch(
        setNotification({ type: 'error', message: err.response.data.error })
      )
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="type username here"
        />
        <br />
      </div>
      <div>
        password:
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="type password here"
        />
      </div>
      <br />
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
