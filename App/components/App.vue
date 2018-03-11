<template>
  <div id="App">
        gyfHello world
       <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    /*computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    },*/
    data() {
      return {
        section: 'test section'
      }
    }
  }
</script>
<style>

</style>