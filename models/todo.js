const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 透過 Schema，我們可定義一筆 todo 裡面有包含哪些資料
// new 後面接 Schema - 這是一個建構式函式(S2-2 選修)，在建構式裡傳入參數(定義資料要有那些屬性)
const todoSchema = new Schema({
  name: {
    type: String,
    require: true,
  }
})

module.exports = mongoose.model('Todo', todoSchema)
