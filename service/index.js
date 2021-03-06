/**
 * Created by GXD on 2017/10/16.
 *
 */
var express = require('express')
var app = express()
var mongoose = require('mongoose')
const debug = require('debug')('index')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const md5 = require('md5')

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
app.listen(9983, () => {
})
app.use(bodyParser.json())

/**
 * 使用mongoose数据库
 */
mongoose.connect('mongodb://localhost/userManager') // 将userManager数据库挂载到localhost上运行,如果没有该数据库就创建

/**
 * 使用session
 */
app.use(session({
  secret: 'keyboard cat',
  store: new MongoStore({
    url: 'mongodb://localhost/userManager'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))

// 现在需要检验数据库是否连接成功
var db = mongoose.connection
db.on('error', (err) => {
  debug('数据库打开失败', err)
})
db.once('open', () => {
  debug('数据库打开成功')
  // 创建一个schema，它是用来定义数据表结构的，只有schema里定义的字段才能被保存到数据库
  var userSchema = mongoose.Schema({
    name: String,
    pwd: String
  })
  // 创建模型User，他可以操作数据库中的数据表
  // userInfo其实是数据表（同时被创建出来）
  var User = mongoose.model('userInfo', userSchema)
  /**
   * 注册
   */
  app.post('/signup', (req, res) => {
    // 先判断是否有这name是否已经注册过了
    new Promise((resolve, reject) => {
      User.findOne({name: req.body.name}, (err, persion) => {
        if (err) {
          debug('注册时查询用户失败', err)
          const err1 = '注册时查询用户出现位置错误'
          reject(err1)
        } else {
          debug('看注册查询数据库的结果是啥', persion)
          if (persion) {
            const err2 = '该账号已注册，请重新输入账号'
            reject(err2)
          } else {
            resolve('可以注册')
          }
        }
      })
    }).then((data) => {
      // 账号没有被注册过
      const saveData = {
        name: req.body.name,
        pwd: md5(req.body.pwd)
      }
      // 模型是创建文档的类，在这个例子中,一个silence就是一个文档(文档就是数据表中的一条一条的项)
      var silence = new User(saveData)
      silence.save((err, doc) => {
        if (err) {
          debug('保存数据库失败', err)
          res.status(500).json(req.body)
        } else {
          debug('保存数据库成功', doc)
          res.status(200).send('注册成功')
        }
      })
    }).catch((err) => {
      res.status(200).json({status: err})
    })
  })
  /**
   * 登录
   */
  app.post('/signIn', (req, res) => {
    debug('这个是登录时浏览器发送过来的数据', req.body)
    User.findOne({name: req.body.name}, (err, persion) => {
      if (err) {
        debug('数据库查询用户失败', err)
        res.status(500).send('未知错误')
      } else {
        debug('看登录查询数据库的结果是啥', persion)
        if (!persion) {
          res.status(200).send('NOT FIND')
          return
        }
        if (persion.pwd !== req.body.pwd) {
          res.status(200).send('密码错误')
        } else {
          debug('什么情况？？？')
          req.session.userInfo = {}
          req.session.userInfo.name = req.body.name
          res.status(200).json({status: '登录成功', name: req.body.name})
        }
      }
    })
  })
})
