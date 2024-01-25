const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI

mongoose.set('strictQuery', false)

logger.info('connecting to', mongoUrl)

const main = async () => {
  try {
    const result = await mongoose.connect(mongoUrl, { dbName: config.DBNAME })
    logger.info('connected to MongoDB', result.connections[0].name)
  } catch (error) {
    logger.error('error connecting to MongoDB:', error.message)
  }
}

main()

// mongoose.connect(mongoUrl, { dbName: config.DBNAME })
//   .then(result => logger.info('connected to MongoDB', result.connections[0].name))
//   .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.reqLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app