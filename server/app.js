const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const app = express()

app.use(session({
    name: 'bolg', // 设置 cookie 中保存 session id 的字段名称
    secret:'bolg', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge:2592000000// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
      url: 'mongodb://localhost:27017/bolg'// mongodb 地址
    })
  }))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(api);

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))

// 首页静态页面open
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8') 
    res.send(html)
})


// 监听80端口
app.listen(80);
console.log('server is running 80');
