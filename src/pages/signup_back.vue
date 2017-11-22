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
        <div v-if="isSignIn" class="container-border flex-c m-around animated flipInX">
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
        <div v-if="!isSignIn" class="container-border flex-c m-around animated flipInYR">
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
            <Button type="primary" @click="cancel">取 消</Button>
            <Button type="primary" @click="signUp" class="to-left-large">注 册</Button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  const debug = require('debug')('login')
  const _ = require('lodash')
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
        debug('点击了登录按妞')
        // 判断数据合法性
        if (_.isEmpty(this.name) || _.isEmpty(this.password)) {
          this.$Notice.warning({
            title: '名称或密码不能为空'
          })
          return
        }
        // 登录
        http.post('/signIn', {
          name: this.name,
          pwd: this.password
        })
          .then((res) => {
            debug('登陆成功', res)
            if (res.data === '密码错误') {
              this.$Notice.error({
                title: '密码错误!'
              })
              this.password = ''
              return
            }
            if (res.data === 'NOT FIND') {
              this.$Notice.error({
                title: '该用户未注册!'
              })
              this.name = ''
              this.password = ''
              return
            }
            this.$Notice.success({
              title: '登陆成功!'
            })
            window.location.hash = '/modify'
          }).catch((err) => {
            debug('登录失败', err)
            this.$Notice.error({
              title: '登录失败!'
            })
          })
      },
      // 点击注册
      signUp () {
          // 判断数据合法性
        if (_.isEmpty(this.name) || _.isEmpty(this.password) || _.isEmpty(this.passwordTwo)) {
          this.$Notice.warning({
            title: '名称或密码不能为空'
          })
          return
        }
        // 判断两次输入的密码是否相同
        if (this.password !== this.passwordTwo) {
          this.$Notice.warning({
            title: '两次输入的密码不一致，请重新输入！'
          })
          this.password = ''
          this.passwordTwo = ''
          return
        }
        // 保存数据库
        http.post('/signup', {
          name: this.name,
          pwd: this.password
        }).then((res) => {
          this.$Notice.success({
            title: '注册成功, 请登录！'
          })
          this.cancel()
          debug('注册成功', res)
        }).catch((err) => {
          this.$Notice.error({
            title: '注册失败！'
          })
          debug('注册失败', err)
        })
      },
      // 取消注册
      cancel () {
        this.name = ''
        this.password = ''
        this.passwordTwo = ''
        this.isSignIn = true
      }
    }
  }
</script>
