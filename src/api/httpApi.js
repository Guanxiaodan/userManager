/**
 * Created by GXD on 2017/10/16.
 *
 */
const axios = require('axios')

const http = axios.create({
  baseURL: 'http://localhost:9983',
  timeout: 2000
})

module.exports = {
  post (url, data) {
    return http.post(url, data)
  }
}
