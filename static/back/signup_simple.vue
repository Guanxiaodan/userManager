<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container-all {
    width: 100%;
    height: 100%;
    background: url("../city.jpg") no-repeat;
    /*background: url("https://whvn.cc/338001") no-repeat;*/
    background-size: cover;
  }

  .container-border {
    box-shadow: 0 0 2px rgba(255, 255, 255, .7), 0 1px 8px rgba(0, 0, 0, .3);
    border: 1px solid #ccc;
    width: 20rem;
    height: 20rem;
    border-radius: 1rem;
  }

  .container-border:hover {
    box-shadow: 0 0 2px rgba(0, 0, 0, .3), 0 1px 8px rgba(0, 0, 0, .3);

  }
  .rice-yellow {
    color: #fff8ba;
  }
  .green {
    color: #0deac9;
  }
</style>

<template>
    <div class="flex-c center container-all">
      <Button type="primary" @click="login">登 录</Button>
    </div>
</template>

<script>
  const debug = require('debug')('login')
//  const _ = require('lodash')
  const http = require('../../src/api/httpApi')

  export default {
    data () {
      return {
      }
    },
    methods: {
        // 点击登录按钮
      login () {
        // 登录
        http.post('/signIn', {
          name: '小明明'
        })
          .then((res) => {
            debug('成功', res)
          })
          .catch((err) => {
            debug('登录失败', err)
          })
      }
    }
  }
</script>
