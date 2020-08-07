export default {
  setLabelList: ({ commit }, info) => {
    commit('SET_LABEL_LIST', info)
  },
  setRegionList: ({ commit }, info) => {
    commit('SET_REGION_LIST', info)
  },
  setUserList: ({ commit }, info) => {
    commit('SET_USER_LIST', info)
  },
  setTradeLabel: ({ commit }, info) => {
    commit('SET_TRADE_LABEL', info)
  },
  setTradeRegion: ({ commit }, info) => {
    commit('SET_TRADE_REGION', info)
  },
  setTradeUSER: ({ commit }, info) => {
    commit('SET_TRADE_USER', info)
  },
  setAgentTypes: ({ commit }, info) => {
    commit('SET_AGENT_TYPES', info)
  },
  setCategoryList: ({ commit }, info) => {
    commit('SET_CATEGORY_LIST', info)
  }
};
