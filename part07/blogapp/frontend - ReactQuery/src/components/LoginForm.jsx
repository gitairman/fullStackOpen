import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { login } from '../services/login'
import { useLoggedInDispatch } from '../loggedInContext'
import { setToken } from '../services/blogs'
import { useMessageDispatch } from '../NotificationContext'

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

  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const queryClient = useQueryClient()
  const dispatchLogin = useLoggedInDispatch()
  const dispatchMessage = useMessageDispatch()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (loggedIn) => {
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedIn))
      setToken(loggedIn.token)
      dispatchLogin(loggedIn)
      username.onReset()
      password.onReset()
      dispatchMessage({
        type: 'info',
        message: `Successfully logged in with ${loggedIn.username}!`,
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

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)
    loginMutation.mutate({
      username: username.value,
      password: password.value,
    })
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
