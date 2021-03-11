const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, //用Date.now 優於 Date.now()
  }
})

// 匯出到 app.js 變成大寫的 User
module.exports = mongoose.model('User', userSchema)
