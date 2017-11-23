/**
 * Created by GXD on 2017/10/16.
 *
 */
var express = require('express')
var app = express()
// var mongoose = require('mongoose')
const debug = require('debug')('index')
const bodyParser = require('body-parser')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)

/**
 *   解决跨域问题
 */
app.all('*', (req, res, next) => {
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

/**
 * 设置服务器监听端口
 */
app.listen(9983, () => {})
app.use(bodyParser.json())

/**
 * 使用session
 */
app.use(session({
  secret: 'userManager',
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))
/**
 * 登录
 */
app.post('/signIn', (req, res) => {
  debug('这是前端传过来的数据', req.body)
  // req.session.name = req.body.name
  debug('这个是session', req.session)
  debug('这个是sessionID', req.sessionID)
  res.status(200).end()
})
