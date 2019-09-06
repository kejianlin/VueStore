import Vue from 'vue'

import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import app from './App.vue'

Vue.use(MintUI)

new Vue({
  el: '#app',
  render: c => c (app)
})