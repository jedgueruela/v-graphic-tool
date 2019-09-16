import Vue from 'vue';
import { createRouter } from './routes';
import { createStore } from './store';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: createRouter(),
  store: createStore(),
}).$mount('#app');
