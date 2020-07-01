export default {
  saveAdId: ({ commit }, info) => {
    commit('SAVE_AD_ID', info)
  },
  saveUserInfo: ({ commit }, info) => {
    commit('SAVE_USER_INFO', info)
  }
};
