import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  Home,
  Page,
  Workspace
} from '../views';

Vue.use(VueRouter);

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        component: Home,
        name: 'home',
        path: '/'
      },
      {
        component: Workspace,
        name: 'workspace',
        path: '/workspace/:wsid',
        children: [
          {
            component: Page,
            name: 'page',
            path: 'pages/:pid'
          }
        ]
      }
    ]
  });
}
