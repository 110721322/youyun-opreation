export default {
  setRoleRoutes: ({ commit }, info) => {
    commit('SET_ROLE_ROUTES', info)
  },
  setRolePermission: ({ commit }, info) => {
    commit('SET_ROLE_PERMISSION', info)
  }
};
