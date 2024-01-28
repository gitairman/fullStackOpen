const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 5
  }
//   friends: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Person'
//     }
//   ],
}, {versionKey: false})

module.exports = mongoose.model('User', schema)