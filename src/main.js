import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import VueResource from 'vue-resource'

import moment from "moment"

Vue.filter('dateFormat',function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import app from './App.vue'

import router from './router.js'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

new Vue({
  el: '#app',
  render: c => c (app),
  router
})