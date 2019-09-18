import Vue from 'vue';
import VueKonva from 'vue-konva'
import { createRouter } from './routes';
import { createStore } from './store';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueKonva);

new Vue({
  render: h => h(App),
  router: createRouter(),
  store: createStore(),
}).$mount('#app');
