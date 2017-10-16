/**
 * Created by GXD on 2017/10/16.
 *
 */
const axios = require('axios')

const http = axios.create({
  baseURL: 'http://192.168.31.117:9983',
  timeout: 1000
})

module.exports = {
  post (url, data) {
    http.post(url, data)
  }
}
