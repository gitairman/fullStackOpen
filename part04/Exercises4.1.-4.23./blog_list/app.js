const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI

mongoose.set('strictQuery', false)

logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrl, { dbName: config.DBNAME })
  .then(result => logger.info('connected to MongoDB', result.connections[0].name))
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.reqLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app