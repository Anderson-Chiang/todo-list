const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  // 拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // (desc 降冪)，_id 是按照 mongo DB 生成的順序來排序
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.error(error))
})

module.exports = router