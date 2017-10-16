/**
 * Created by GXD on 2017/10/16.
 *
 */
var express = require('express')
var app = express()
const debug = require('debug')('index')
const bodyParser = require('body-parser')

app.listen(9983, () => {})
app.use(bodyParser.json)

app.post('/singup', (req, res) => {
  debug('这个是过来的请求数据', req.body)
  res.json(req.body)
})
