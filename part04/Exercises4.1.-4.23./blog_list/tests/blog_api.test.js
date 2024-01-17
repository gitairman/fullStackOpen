const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const res = await api.get('/api/blogs')

  const titles = res.body.map(blog => blog.title)

  expect(titles).toContain("First class tests")
})

test('blog unique identifier property is named "id"', async () => {
  const res = await api.get('/api/blogs')
  const blogsInDb = res.body

  expect(blogsInDb[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'A day in the life of...',
    author: 'Aaron Hopkins',
    url: 'http://www.aaronhopkins.dev/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 17,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const res = await api.get('/api/blogs')
  const blogsInDb = res.body

  expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsInDb[blogsInDb.length - 1].author).toContain('Aaron Hopkins')
  expect(blogsInDb[blogsInDb.length - 1].title).toContain('A day in the life of...')
})

test('if missing from request, likes to default to 0', async () => {
  const newBlog = {
    title: 'A day in the life of...',
    author: 'Aaron Hopkins',
    url: 'http://www.aaronhopkins.dev/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const res = await api.get('/api/blogs')
  const blogsInDb = res.body

  expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsInDb[blogsInDb.length - 1].likes).toBe(0)
})

test('blog without a title property sends appropriate status code', async () => {
  const newBlog = {
    author: 'Aaron Hopkins',
    url: 'http://www.aaronhopkins.dev/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 17,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog without a url property sends appropriate status code', async () => {
  const newBlog = {
    title: 'A day in the life of...',
    author: 'Aaron Hopkins',
    likes: 17,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(resultBlog.body).toEqual(blogToView)
})

test('blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(blog => blog.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('individual blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  blogToUpdate.likes = 77
  blogToUpdate.author = 'updated author'
  blogToUpdate.title = 'updated title'

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(201)

})

afterAll(async () => {
  await mongoose.connection.close()
})