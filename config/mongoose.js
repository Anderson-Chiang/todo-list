const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

// connect database (url解析的東西 & 監控的引擎被棄用，兩個都需要加入參數-可複製貼上)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 把 connect 的東西暫存下來
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

// 用 once 是因為連線成功一次即可，做完一次就會自動把它拿掉
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db