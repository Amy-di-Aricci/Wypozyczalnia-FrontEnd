import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios';

Vue.config.productionTip = false

axios.defaults.proxy = {
  host: 'http://localhost',
  port: 5000,
};

new Vue({
  render: h => h(App),
}).$mount('#app')
