import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
<<<<<<< Updated upstream

Vue.config.productionTip = false

=======
import axios from 'axios';
import VueRouter from "vue-router";
import router from '@/router';

Vue.config.productionTip = false

axios.defaults.proxy = {
  host: 'http://localhost',
  port: 5000,
};

Vue.use(VueRouter);

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

>>>>>>> Stashed changes
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
