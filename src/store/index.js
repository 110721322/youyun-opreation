/**
*          ┌─┐       ┌─┐
*       ┌──┘ ┴───────┘ ┴──┐
*       │                 │
*       │       ───       │
*       │  ─┬┘       └┬─  │
*       │                 │
*       │       ─┴─       │
*       │                 │
*       └───┐         ┌───┘
*           │         │
*           │         │
*           │         │
*           │         └──────────────┐
*           │                        │
*           │                        ├─┐
*           │                        ┌─┘
*           │                        │
*           └─┐  ┐  ┌───────┬──┐  ┌──┘
*             │ ─┤ ─┤       │ ─┤ ─┤
*             └──┴──┘       └──┴──┘
*                 神兽保佑
*                 代码无BUG!
*/

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import utils from "youyun-vue-components/global/kit/utils";

/* 导入模块 */
import admin from './modules/admin';
import role from './modules/role';
import common from './modules/common'
import transaction from './modules/transaction'
import system from './modules/system'

Vue.config.debug = true
Vue.use(Vuex)
Vue.config.warnExpressionErrors = false

/* 使用插件处理页面刷新状态销毁问题 */
const store = new Vuex.Store({
  modules: {
    admin, role, common, transaction, system
  },
  mutations: {
    /**
     * 重置state
     * @param $state
     * @constructor
     */
    RESET_STATE ($state) {
      for (const module in $state) {
        if ($state.hasOwnProperty(module) && module !== 'system') {
          for (const state in $state[module]) {
            if ($state[module].hasOwnProperty(state)) {
              if (utils.isArr($state[module][state])) {
                $state[module][state] = [];
              } else {
                $state[module][state] = null;
              }
            }
          }
        }
      }
    }
  },
  actions: {
    resetState: ({ commit }) => {
      commit('RESET_STATE')
    }
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState(
    {storage: window.localStorage}
  )]
})

export default store
