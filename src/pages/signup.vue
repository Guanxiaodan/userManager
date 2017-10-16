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
        <!--登录页面-->
        <div v-if="isSignIn" class="container-border flex-c m-around ">
          <div>
            <h2 class="rice-yellow">请输入用户名：</h2>
            <Input class="to-top" v-model="name" placeholder="请输入用户名..." style="width: 300px"></Input>
          </div>
          <div>
            <h2 class="rice-yellow">请输入密码：</h2>
            <Input class="to-top" v-model="password" placeholder="请输入密码..." type="password" style="width: 300px"></Input>
          </div>
          <div class="green pointer" @click="isSignIn = false">
            <span>还没有账号?</span>
            <span>点击注册>></span>
          </div>
          <div>
            <Button type="primary" @click="login">登 录</Button>
          </div>
        </div>
        <!--注册页面-->
        <div v-if="!isSignIn" class="container-border flex-c m-around ">
          <div>
            <h2 class="rice-yellow">请输入用户名：</h2>
            <Input class="to-top" v-model="name" placeholder="请输入用户名..." style="width: 300px"></Input>
          </div>
          <div>
            <h2 class="rice-yellow">请输入密码：</h2>
            <Input class="to-top" v-model="password" placeholder="请输入密码..." type="password" style="width: 300px"></Input>
          </div>
          <div>
            <h2 class="rice-yellow">请再次输入密码：</h2>
            <Input class="to-top" v-model="passwordTwo" placeholder="请输入密码..." type="password" style="width: 300px"></Input>
          </div>
          <div>
            <Button type="primary" @click="signUp">注 册</Button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  const debug = require('debug')('login')
//  const _ = require('lodash');
  const http = require('../api/httpApi')

  export default {
    data () {
      return {
        name: '',
        password: '',
        passwordTwo: '', // 再次输入密码
        isSignIn: true // true:登录页面，false:注册页面
      }
    },
    methods: {
        // 点击登录按钮
      login () {
        this.isSignIn = false
        debug('点击了登录按妞')
      },
      // 点击注册
      signUp () {
        http.post('/singup', {
          name: this.name,
          pwd: this.password
        }).then((res) => {
          debug('注册成功', res)
        }).catch((err) => {
          debug('注册失败', err)
        })
//        this.isSignIn = false
      }
    }
  }
</script>
