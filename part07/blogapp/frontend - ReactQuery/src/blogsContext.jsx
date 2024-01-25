import { createContext, useReducer, useContext } from 'react'

const blogsReducer = (state, action) => {
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

const BlogsContext = createContext()

export const BlogsContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, [])

  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  )
}

export const useBlogs = () => {
  return useContext(BlogsContext)[0]
}

export const useBlogsDispatch = () => {
  return useContext(BlogsContext)[1]
}

export default BlogsContext
