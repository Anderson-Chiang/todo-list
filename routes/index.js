const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')

// 根據不同的URL，導引到不同的頁面
router.use('/', home)
router.use('/todos', todos)


module.exports = router