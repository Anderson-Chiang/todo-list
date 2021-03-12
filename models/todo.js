const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 透過 Schema，我們可定義一筆 todo 裡面有包含哪些資料
// new 後面接 Schema - 這是一個建構式函式(S2-2 選修)，在建構式裡傳入參數(定義資料要有那些屬性)
const todoSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  userId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

// 匯出到 app.js 變成大寫的 Todo
module.exports = mongoose.model('Todo', todoSchema) 
