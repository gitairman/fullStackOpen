import { useMutation } from "@apollo/client"
import { useField } from "./customHooks"
import { LOGIN } from "../queries"
import { useEffect, useState } from "react"

const LoginForm = ({show, setToken, setPage}) => {
    const username = useField('text', 'username')
    const password = useField('password', 'password')
    const [message, setMessage] = useState({type: true, message: ''})

    const [login, result] = useMutation(LOGIN, {
        onCompleted: () => {
            setMessage({type: true, message: `Successfully logged in as ${username.value}`})
            username.onReset()
            password.onReset()
            setPage('authors')
            setMessage({type: true, message: ''})
        },
        onError: (err) => {
            setMessage({type: false, message: (err.graphQLErrors[0].message + ', please try again').toUpperCase()})
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data])

    const submit = async (e) => {
        e.preventDefault()

        login({ variables: { username: username.value, password: password.value }})

      }

    if (!show) {
        return null
    }

    return (
        
    <div>
    <h3>User Login</h3>
    <p style={{display: message.message !== '' ? '': 'none', color: message.type ? 'green':'red'}}>{message.message}</p>
    <form onSubmit={submit}>
      <div>
          Username
        <input {...username} />
      </div>
      <div>
          Password
        <input {...password} />
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
    )

}

export default LoginForm