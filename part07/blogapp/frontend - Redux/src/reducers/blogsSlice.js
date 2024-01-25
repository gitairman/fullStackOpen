import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addNew: (state, action) => {
      return [...state, action.payload]
    },
    update: (state, action) => {
      const id = action.payload.id
      return state
        .map((item) => (item.id === id ? action.payload : item))
        .sort((a, b) => b.likes - a.likes)
    },
    remove: (state, action) => {
      return state
        .filter((blog) => blog.id !== action.payload)
        .sort((a, b) => b.likes - a.likes)
    },
    setBlogs: (state, action) => {
      return action.payload
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const initialBlogs = await blogsService.getAll()
    initialBlogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(initialBlogs))
  }
}

export const createNew = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog)
    console.log(newBlog)
    dispatch(addNew(newBlog))
  }
}

export const updateBlog = (id, updated) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.update(id, updated)
    dispatch(update(updatedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(id)
    dispatch(remove(id))
  }
}

export const selectBlogs = (state) => state.blogs
export const { addNew, update, remove, setBlogs } = blogsSlice.actions
export default blogsSlice.reducer
