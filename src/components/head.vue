<template>
  <div class="heads flex-r between x-center">
    <!--右侧网站图标和题目-->
    <div class="head-title flex-r to-left-large">
      <img src="../../static/img/cart.png" class="head-title-img" alt="">
      <div class="to-left flex-c m-center">
        <h1>购物车管理系统</h1>
      </div>
    </div>
    <!--左侧用户头像，姓名，退出按钮-->
    <div class="head-user flex-r x-center">
      <div class="head-user-info flex-r pointer">
        <img class="head-user-img" src="../../static/img/girl-8.jpeg" alt="这里应该是用户头像">
        <div class="head-user-name flex-c m-center">
          <h4>刘亦菲</h4>
        </div>
      </div>
      <h4 class="head-user-exit to-left to-right pointer">退出登录</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gets',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .heads {
    width: 100%;
    height: 70px;
    /*background: pink;*/
    background: url("../../static/img/bjglass2.png");
  }
  .head-title {

  }
  .head-title-img {
    width: 58px;
    height: 58px;
  }
  .head-user {

  }
  .head-user-info {

  }
  .head-user-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .head-user-name {
    margin-left: 10px;
  }
  .head-user-exit {
    color: mediumvioletred;
  }
</style>
