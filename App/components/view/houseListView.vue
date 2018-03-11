<template>
  <div id="App">
        <h1>房屋列表{{section}}--{{age}}--{{loginInfo.name}}</h1>
        <h2>test--->list{{houseList.title}}</h2>
        <ul>
              <li v-for="item in houseList.data">age--->{{item.age}}</li>
        </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: "App",
    computed: {
      ...mapState({
           //这里面是vuex里面的数据状态
           houseList: state => state.houseList,
           loginInfo: state => state.loginInfo
      }),
      //保证你还可以自定义一些你自己本地的计算属性
    },
    data() {
      //本地的数据状态
      return {
        section: 'test section',
        age: 18
      }
    },
    asyncData({store,  router}) {
        console.log(store, router)
        return store.dispatch('loadList', {
            phone: 'List-123'
        })
    }
  }
</script>
<style>

</style>