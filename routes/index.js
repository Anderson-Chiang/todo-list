const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth') // 引用模組

const { authenticator } = require('../middleware/auth')

// 根據不同的URL，導引到不同的頁面
router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/auth', auth) // 掛載模組
router.use('/', authenticator, home) 
// 條件最寬鬆的放在最後面，以免無限跳轉讓伺服器當掉

module.exports = router