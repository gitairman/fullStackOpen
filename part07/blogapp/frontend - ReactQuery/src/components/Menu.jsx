import { Link, useNavigate } from 'react-router-dom'
import { useLoggedIn, useLoggedInDispatch } from '../loggedInContext'
import { useMessageDispatch } from '../NotificationContext'
import { memo, useEffect } from 'react'
import { setToken } from '../services/blogs'
import { Navbar, NavLink } from 'react-bootstrap'

const Menu = memo(() => {
  const user = useLoggedIn()
  const dispatchLogin = useLoggedInDispatch()
  const dispatchMessage = useMessageDispatch()

  const navigate = useNavigate()

  const padding = {
    padding: 5,
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setToken(user.token)
      dispatchLogin(user)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatchLogin(null)
    dispatchMessage({
      type: 'info',
      message: `${user.username} was successfully logged out!`,
    })
    navigate('/login')
  }

  const userLoggedIn = () => (
    <div>
      <em>Logged in as {user.username}</em>
      <button
        id="logout-button"
        style={{ marginLeft: 5, marginBottom: 10 }}
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  )

  return (
    <div>
      {/* <Link style={padding} to="/">
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
      )} */}

      <Navbar
        className="navbar navbar-light"
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <NavLink className="navbar-brand" href="#">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link active" href="#">
              <Link style={padding} to="/">
                home
              </Link>
            </NavLink>
            <NavLink className="nav-item nav-link" href="#">
              <Link style={padding} to="/blogs">
                blogs
              </Link>
            </NavLink>
            <NavLink className="nav-item nav-link" href="#">
              <Link style={padding} to="/users">
                users
              </Link>
            </NavLink>
            {user ? (
              userLoggedIn()
            ) : (
              <NavLink className="nav-item nav-link" href="#">
                <Link style={padding} to="/login">
                  login
                </Link>
              </NavLink>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  )
})

Menu.displayName = 'Menu'

export default Menu
