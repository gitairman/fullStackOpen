import { createContext, useReducer, useContext } from 'react'

const usersReducer = (state, action) => {
  switch (action.type) {
  case 'append':
    return [...state, action.payload]
  case 'remove':
    return state.filter((blog) => blog.id !== action.payload)
  case 'update':
    return state
      .map((blog) => (blog.id !== action.payload.id ? blog : action.payload))
      .sort((a, b) => b.likes - a.likes)
  case 'set':
    return action.payload.sort((a, b) => b.likes - a.likes)
  default:
    return state
  }
}

const UsersContext = createContext()

export const UsersContextProvider = (props) => {
  const [users, usersDispatch] = useReducer(usersReducer, [])

  return (
    <UsersContext.Provider value={[users, usersDispatch]}>
      {props.children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {
  return useContext(UsersContext)[0]
}

export const useUsersDispatch = () => {
  return useContext(UsersContext)[1]
}

export default UsersContext
