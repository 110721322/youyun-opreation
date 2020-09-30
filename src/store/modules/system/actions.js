export default {
  setPositionList: ({ commit }, info) => {
    commit('SET_POSITION_LIST', info)
  },
  setEmployeeList: ({ commit }, info) => {
    commit('SET_EMPLOYEE_LIST', info)
  },
  setSuperiorList: ({ commit }, info) => {
    commit('SET_SUPERIOR_LIST', info)
  }
};
