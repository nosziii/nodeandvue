<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
      <router-link :to="{ name: 'Login'}">Login</router-link>
      <a href="#" v-on:click="logout">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import router from 'router'


export default {
  name: 'App',
  components: {

  },
  methods:{
    logout: function (e) {
      console.log("==== e", e)
      axios
          .get("/api/logout")
          .then(() => {
            router.push("/")
          })
    }
  }

}
</script>

<style>
  @import './assets/styles/global.css';
</style>