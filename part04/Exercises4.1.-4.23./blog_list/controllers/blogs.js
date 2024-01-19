const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {

  const blogs = await Blog.find()
  res.json(blogs)

})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const user = await User.findById(blog.userId)
  blog.user = user.id

  if (!blog.likes) {
    blog.likes = 0
  }
  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedNote.id]
  await user.save()
  res.status(201).json(savedBlog)

})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(201).send(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter