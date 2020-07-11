export default {
  saveAccessToken: ({ commit }, $info) => {
    commit('SAVE_ACCESS_TOKEN', $info)
  },
  saveUserInfo: ({ commit }, $info) => {
    commit('SAVE_USER_INFO', $info)
  },
  saveRoutersArr: ({ commit }, $info) => {
    commit('SAVE_ROUTERS_ARR', $info)
  }
};
