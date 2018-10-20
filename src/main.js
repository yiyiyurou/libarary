// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import store from '@/store/store.js'

require('./mock.js')

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
