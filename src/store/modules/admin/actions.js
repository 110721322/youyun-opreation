import { Message } from 'element-ui';
function errorCallback(message, type) {
  Message({
    message: message || "出现错误，请稍后再试",
    duration: 2000,
    type: type || 'error'
  })
}

export default {
  saveAccessToken: ({ commit }, $info) => {
    commit('SAVE_ACCESS_TOKEN', $info)
  },
  saveUserInfo: ({ commit }, $info) => {
    commit('SAVE_USER_INFO', $info)
  },
  saveRoutersArr: ({ commit }, $info) => {
    commit('SAVE_ROUTERS_ARR', $info)
  },
  saveKeepAlive: ({ commit }, $list) => {
    commit('SAVE_KEEP_ALIVE', $list);
  }
};
