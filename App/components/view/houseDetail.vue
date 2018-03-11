<template>
  <div id="Detail">
        <h1>详情---{{loginInfo.name}}</h1>
        <h2>test--->Detail</h2>
      
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "App",
    computed: {
      ...mapState({
           //这里面是vuex里面的数据状态
           loginInfo: state => state.loginInfo,
           houseList: state => state.houseList
      }),
      //保证你还可以自定义一些你自己本地的计算属性
    },
    data() {
      return {
        section: 'test section'
      }
    },
    asyncData({store,  router}) {
        console.log(store, router)
        return store.dispatch('loadDetail', {
            phone: 'detail-123'
        })
    }
  }
</script>
<style>

</style>