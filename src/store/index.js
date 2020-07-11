import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

/* 导入模块 */
import admin from './modules/admin';
import role from './modules/role';
import system from './modules/system';

Vue.config.debug = true
Vue.use(Vuex)
Vue.config.warnExpressionErrors = false

/* 使用插件处理页面刷新状态销毁问题 */
const store = new Vuex.Store({
  modules: {
    admin, role, system
  },
  strict: process.env.NODE_ENV !== 'prod',
  plugins: [createPersistedState(
    {storage: window.sessionStorage}
  )]
})

export default store
