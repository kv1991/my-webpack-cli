<template>
  <div>
    <router-link to='/'>首页</router-link>|
    <router-link to='/about'>关于</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        title: 'Hello Vue'
      }
    }
  }
</script>

<style>

</style>