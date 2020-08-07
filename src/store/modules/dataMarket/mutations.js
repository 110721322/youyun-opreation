export default {
  SET_LABEL_LIST(state, info) {
    state.labelList = info
  },
  SET_REGION_LIST(state, info) {
    state.regionList = info
  },
  SET_USER_LIST(state, info) {
    state.userList = info
  },
  SET_TRADE_LABEL(state, info) {
    info = info.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
    state.tradeLabelList = info
  },
  SET_TRADE_REGION(state, info) {
    info = info.map(item => {
      return {
        label: item.regionName,
        value: item.regionCode
      }
    })
    state.tradeRegionList = info
  },
  SET_TRADE_USER(state, info) {
    info = info.map(item => {
      return {
        label: item.name || item.jobName || item.nickName || item.id,
        value: item.id
      }
    })
    state.tradeUserList = info
  },
  SET_AGENT_TYPES(state, info) {
    info = info.map(item => {
      return {
        label: item.desc,
        value: item.type
      }
    })
    state.agentTypes = info
  },
  SET_CATEGORY_LIST(state, info) {
    info = info.map(item => {
      return {
        label: item.mccTxt,
        value: item.mccCode
      }
    })
    state.categoryList = info
  }
};
