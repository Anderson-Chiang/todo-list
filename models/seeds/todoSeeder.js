const mongoose = require('mongoose')
const Todo = require('../Todo') //在根目錄的第二層，所以是../

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  // Todo 只有定義 name，先輸入 name 就好
  // 透過 for 迴圈，來重複執行 Todo 的 create 這件事情
  // create裡面傳入一個物件，這個物件就是我們要變成Todo這筆資料的內容
  for (let i =0; i < 10; i++) {
    Todo.create({ name: `name-${i}`})
  } 
  console.log('done.')
})