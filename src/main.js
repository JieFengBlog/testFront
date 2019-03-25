import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './store/store'
// import './element-variables.scss'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI, { locale })


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
