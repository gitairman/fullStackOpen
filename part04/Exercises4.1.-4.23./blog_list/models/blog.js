const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [5, '{PATH} must be at least 5 characters long'],
    required: '{PATH} is required!'
  },
  author: {
    type: String,
    required: '{PATH} is required!'
  },
  url: {
    type: String,
    required: '{PATH} is required!',
    unique: true,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { versionKey: false })

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)