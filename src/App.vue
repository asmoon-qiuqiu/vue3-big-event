<script setup>
import { useUserStore } from './stores'
const userStore = useUserStore()
</script>

<template>
  <div>
    APP
    <hr>
    <router-view></router-view>
    <hr>
    <hr>
    <hr>
  </div>

  <el-button @click="$router.push('/home')">首页</el-button>
  <div>
    <p> {{ userStore.token }}</p>
    <el-button @click="userStore.setToken('asdas')" type="success">token</el-button>
    <el-button @click="userStore.removeToken()" type="info">remove</el-button>
  </div>

</template>

<style scoped></style>
