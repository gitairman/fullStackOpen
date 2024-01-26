const commentsRouter = require('express').Router({ mergeParams: true })
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/', async (req, res) => {

    const comments = await Comment.find().populate('blog', {
      title: 1,
      author: 1,
      url: 1
    })
    res.json(comments)
  
  })

  commentsRouter.post('/', async (req, res) => {
    console.log(req.params.id, req.body)
    const blogId = req.params.id
    const comment = new Comment(req.body)
    comment.blog = blogId
    const savedComment = await comment.save()
    const blog = await Blog.findById(blogId)
    blog.comments = [...blog.comments, savedComment.id]
    await blog.save()
    const populatedComment = await Comment.findById(savedComment.id).populate('blog', {
      title: 1,
      author: 1,
      url: 1,
    })
    res.status(201).json(populatedComment)
  
  })

module.exports = commentsRouter