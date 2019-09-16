import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  Home,
  NoPage,
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
        path: '/'
      },
      {
        component: Workspace,
        path: '/workspace/:wsid',
        children: [
          {
            component: NoPage,
            name: 'nopage',
            path: ''
          },
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
