<template>
  <div id="app222">
    <div v-if="hashs !== '/'">
      <heads></heads>
    </div>

    <router-view/>
  </div>
</template>

<script>
  import heads from './components/head.vue'
  const debug = require('debug')('app')

  export default {
    name: 'app333',
    data () {
      return {
        hashs: '/'
      }
    },
    components: {
      heads
    },
    created () {
      let vm = this
      window.onhashchange = function () {
        const h = location.hash
        vm.getHash(h)
      }
      window.onload = function () {
        const h = location.hash
        vm.getHash(h)
      }
    },
    methods: {
      getHash (h) {
        this.hashs = h.substring(1, h.length)
        debug('this.hashs', this.hashs)
      }
    }
  }
</script>

<style>
  #app222 {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }

  /*垂直布局*/
  .flex-c {
    display: flex;
    flex-direction: column;
  }

  /*水平布局*/
  .flex-r {
    display: flex;
    flex-direction: row;
  }

  /*主轴方向元素居中*/
  .m-center {
    justify-content: center;
  }

  /*交叉方向元素居中*/
  .x-center {
    align-items: center;
  }

  /*上下左右居中*/
  .center {
    justify-content: center;
    align-items: center;
  }

  /*主轴方向平均分配*/
  .m-around {
    justify-content: space-around;
  }

  /*主轴方向顶边分配*/
  .between {
    justify-content: space-between;
  }

  .to-top {
    margin-top: 1rem;
  }

  .to-top-large {
    margin-top: 2rem;
  }

  .to-left {
    margin-left: 1rem;
  }

  .to-left-large {
    margin-left: 2rem;
  }

  .to-right {
    margin-right: 1rem;
  }

  .to-right-large {
    margin-right: 2rem;
  }

  .to-bottom {
    margin-bottom: 1rem;
  }

  .to-bottom-large {
    margin-bottom: 2rem;
  }

  .cover {
    width: 100%;
    height: 100%;
  }

  .pointer {
    cursor: pointer;
  }

  .shadow {
    box-shadow: 0 0 2px rgba(0, 0, 0, .3), 0 1px 8px rgba(0, 0, 0, .3);
  }
</style>
