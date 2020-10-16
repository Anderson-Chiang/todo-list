const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Todo = require('./models/todo') // 相對路徑 (./)

const routes = require('./routes') //可以不用寫/index，因為node.js預設會去找
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

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 每一個 request 進來之後，都會通過 body-parser 的解析
app.use(bodyParser.urlencoded({ extended: true }))

// method-override ()
app.use(methodOverride('_method'))

// set route
app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})