const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    minLength: [5, '{PATH} must be at least 5 characters long'],
    required: '{PATH} is required!'
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
}, { versionKey: false })

commentSchema.plugin(uniqueValidator)

commentSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
  }
})

module.exports = mongoose.model('Comment', commentSchema)