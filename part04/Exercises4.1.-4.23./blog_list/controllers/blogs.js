const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')

const Blog = require('../models/blog')

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

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
  const blog = new Blog(req.body)

  const user = req.user

  blog.user = user.id

  if (!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedBlog.id]
  await user.save()
  res.status(201).json(savedBlog)

})

blogsRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(404).end()
  }

  const user = req.user

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'blog can only be updated by user who created it!'})
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(201).send(updatedBlog)
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(404).end()
  }

  const user = req.user

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'blog can only be deleted by user who created it!'})
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter