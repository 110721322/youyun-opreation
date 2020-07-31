export default {
  setLabelList: ({ commit }, info) => {
    commit('SET_LABEL_LIST', info)
  },
  setRegionList: ({ commit }, info) => {
    commit('SET_REGION_LIST', info)
  },
  setUserList: ({ commit }, info) => {
    commit('SET_USER_LIST', info)
  }
};
