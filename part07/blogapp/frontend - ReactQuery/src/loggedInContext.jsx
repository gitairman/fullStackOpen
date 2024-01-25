import { createContext, useReducer, useContext } from 'react'

const loggedInReducer = (state, action) => {
  return action
}

const LoggedInContext = createContext()

export const LoggedInContextProvider = (props) => {
  const [loggedIn, loggedInDispatch] = useReducer(loggedInReducer, null)

  return (
    <LoggedInContext.Provider value={[loggedIn, loggedInDispatch]}>
      {props.children}
    </LoggedInContext.Provider>
  )
}

export const useLoggedIn = () => {
  return useContext(LoggedInContext)[0]
}

export const useLoggedInDispatch = () => {
  return useContext(LoggedInContext)[1]
}

export default LoggedInContext
