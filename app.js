const express = require('express')
const mongoose = require('mongoose')

const app = express()

// connect database (url解析的東西 & 監控的引擎被棄用，兩個都需要加入參數-可複製貼上)
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 把 connect 的東西暫存下來
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

// 用 once 是因為連線成功一次即可，做完一次就會自動把它拿掉
db.once('open', () => {
  console.log('mongodb connected!')
})

// set route
app.get('/', (req, res) => {
  res.send(`Hello World!`)
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})