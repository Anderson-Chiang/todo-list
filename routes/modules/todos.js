const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})

// router.post('/', (req, res) => {
//   const name = req.body.name // 記得要安裝 body-parser

//   return Todo.create({ name: name })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

router.post('/', (req, res) => {
  const todos = String(req.body.name).split(',').map(todo => ({ name: todo }))
  // [123, 456, 234]
  // -> [{name: 123}, {name: 456}]

  return Todo.insertMany(todos)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo: todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo: todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body //解構賦值語法，把name跟isDone一起從body拿出來(拿到body裡面定義好的name跟isDone)
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on' //等同於 if/else statement
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router