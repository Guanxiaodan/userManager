<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container-all {
    width: 100%;
    height: 100%;
    background: url("../../static/city.jpg") no-repeat;
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
      <div>
        <div class="container-border flex-c m-around ">
          <div>
            <h2 class="rice-yellow">请输入用户名：</h2>
            <Input class="to-top" v-model="name" placeholder="请输入用户名..." style="width: 300px"></Input>
          </div>
          <div>
            <h2 class="rice-yellow">请输入密码：</h2>
            <Input class="to-top" v-model="password" placeholder="请输入密码..." type="password" style="width: 300px"></Input>
          </div>
          <div class="green pointer">
            <span>还没有账号?</span>
            <span>点击注册>></span>
          </div>
          <div>
            <Button type="primary" @click="login">登 录</Button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  const debug = require('debug')('login')
//  const _ = require('lodash');

  export default {
    data () {
      return {
        name: '',
        password: ''
      }
    },
    methods: {
      login () {
        debug('点击了登录按妞')
      }
    }
  }
</script>
