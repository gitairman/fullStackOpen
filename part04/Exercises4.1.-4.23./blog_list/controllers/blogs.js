const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {

  const blogs = await Blog.find().populate('user', {
    username: 1,
    name: 1
  })
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
  const decodedToken = jwt.verify(req.token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  blog.user = user.id

  if (!blog.likes) {
    blog.likes = 0
  }
  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedBlog.id]
  await user.save()
  res.status(201).json(savedBlog)

})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(201).send(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(404).end()
  }

  const decodedToken = jwt.verify(req.token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'blog can only be deleted by user who created it!'})
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter