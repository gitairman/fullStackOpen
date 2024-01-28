const mongoose = require('mongoose')

// you must install this library
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    published: {
      type: Number,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      autopopulate: true,
    },
    genres : [{ type: String }],
  },
  { versionKey: false }
)

// schema.index({ genres: 'text' })
schema.plugin(uniqueValidator)
schema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Book', schema)
