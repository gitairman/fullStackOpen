import { Link } from 'react-router-dom'
import { useLoggedIn, useLoggedInDispatch } from '../loggedInContext'
import { useMessageDispatch } from '../NotificationContext'

const Menu = () => {
  const user = useLoggedIn()
  const dispatchLogin = useLoggedInDispatch()
  const dispatchMessage = useMessageDispatch()

  const padding = {
    padding: 5,
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatchLogin(null)
    dispatchMessage({
      type: 'info',
      message: `${user.username} was successfully logged out!`,
    })
  }

  const userLoggedIn = () => (
    <>
      <em>Logged in as {user.username}</em>
      <button
        id="logout-button"
        style={{ marginLeft: 5, marginBottom: 10 }}
        onClick={handleLogout}
      >
        logout
      </button>
    </>
  )

  return (
    <div>
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        userLoggedIn()
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  )
}

export default Menu
