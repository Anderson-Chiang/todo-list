const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes') //可以不用寫/index，因為node.js預設會去找

// 匯入passport設定檔，定義userPassport函式
const usePassport = require('./config/passport')
require('./config/mongoose') //不用設變數來接

const app = express()
const PORT = process.env.PORT || 3000

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// 每一個 request 進來之後，都會通過 body-parser 的解析
app.use(bodyParser.urlencoded({ extended: true }))

// method-override ()
app.use(methodOverride('_method'))

// 調用 usePassport函式，並傳入必要參數app
usePassport(app)

// set route
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})