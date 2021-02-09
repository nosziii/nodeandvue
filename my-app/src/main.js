import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import router from './router'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
//
// axios.defaults.withCredentials = true
// Vue.use(VueAxios, axios)

// Vue.axios.post(
//   'http://localhost:3080',
//   {
//     data: 'some post data'
//   },
//   {
//     withCredentials: false
//   })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);
