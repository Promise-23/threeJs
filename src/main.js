import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import * as Util from './util/common.js'

import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper,/* { default options with global component } */)

Vue.prototype.util = Util

new Vue({
  render: h => h(App),
}).$mount('#app')
