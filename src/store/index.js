import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import workspace from './workspace';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    modules: {
      workspace
    }
  });
}
