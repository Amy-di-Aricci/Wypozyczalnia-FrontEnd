import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false

import axios from 'axios';
import VueRouter from "vue-router";
import Router from 'vue-router';
import router from '@/router';

Vue.config.productionTip = false
axios.defaults.proxy = {
  host: 'http://localhost',
  port: 5000,
};

const token = localStorage.getItem('accessToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
}

Vue.use(VueRouter);
Vue.use(Router);
Vue.use(VueMoment, 'vue-moment');
Vue.use(axios);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
