/**
 * Created by GXD on 2017/10/16.
 *
 */
var express = require('express')
var app = express()
const debug = require('debug')('index')
const bodyParser = require('body-parser')

// 解决跨域问题
app.use('/', (req, res, next) => {
  debug('HTTP REQ:', req.method, req.url, req.headers.origin)
  // TODO: 设置跨域的黑白名单
  res.set('Access-Control-Allow-Method', req.method)
  res.set('Access-Control-Allow-Credentials', 'true')
  res.set('Access-Control-Allow-Headers', 'DNT,COOKIE,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,X-Forwarded-For')
  res.set('Access-Control-Allow-Origin', req.headers.origin || 'null') // 表示允许 req.headers.origin 所代表的域名访问
  if (req.method === 'OPTIONS') {
    res.status(204).end()
  } else {
    next()
  }
})

app.listen(9983, () => {})
app.use(bodyParser.json())

// // 使用mongoose数据库
// var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/userManager') // 将userManager数据库挂载到localhost上运行
//
// // 现在需要检验数据库是否连接成功
// var db = mongoose.connection();
// db.on('error', () => {
//   debug('数据库打开失败')
// })
// db.once('open', () => {
//   debug('数据库打开成功')
// })

app.post('/singup', (req, res) => {
  debug('这个是过来的请求数据', req.body)
  res.status(200).json(req.body)
})
