import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import VueResource from 'vue-resource'

Vue.use(VueResource)

import MintUI from 'mint-ui'

Vue.use(MintUI)

import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import app from './App.vue'



import router from './router.js'

new Vue({
  el: '#app',
  render: c => c (app),
  router
})