import Vue from 'vue';
import { createRouter } from './routes';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: createRouter(),
}).$mount('#app');
