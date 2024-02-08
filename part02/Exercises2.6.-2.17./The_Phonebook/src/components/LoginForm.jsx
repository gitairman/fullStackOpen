import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

const LoginForm = ({ setLoggedIn, loggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0()

  useEffect(() => {
    if (isAuthenticated) setLoggedIn(true)
  }, [isAuthenticated])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }>
        Log Out
      </button>
      {isAuthenticated && <h2>Logged in as {user.name}</h2>}
    </div>

    // <div className="login-form">
    //   <h2>-- Log In --</h2>
    //   <form onSubmit={handleLogin}>
    //     <table className="login-form">
    //       <tbody>
    //         <tr>
    //           <td>Username:</td>
    //           <td>
    //             <input
    //               onChange={({ target }) => setUsername(target.value)}
    //               value={username}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Password:</td>
    //           <td>
    //             <input
    //               onChange={({ target }) => setPassword(target.value)}
    //               value={password}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td></td>
    //           <td style={{ textAlign: 'left' }}>
    //             <button type="submit">login</button>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </form>
    // </div>
  )
}

export default LoginForm
