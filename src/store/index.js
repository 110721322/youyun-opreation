import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

/* 导入模块 */
import admin from './modules/admin';

Vue.config.debug = true
Vue.use(Vuex)
Vue.config.warnExpressionErrors = false

const store = new Vuex.Store({
  modules: {
    admin
  },
  strict: process.env.NODE_ENV !== 'prod',
  plugins: [createPersistedState(
    {storage: window.sessionStorage}
  )]
})
console.log(store);
export default store
