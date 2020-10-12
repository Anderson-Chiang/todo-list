const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Todo = require('./models/todo') // 相對路徑 (./)

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

// set route
app.get('/', (req, res) => {
  // 拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name // 記得要安裝 body-parser

  return Todo.create({ name: name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo: todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo: todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})