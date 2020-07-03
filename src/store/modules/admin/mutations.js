export default {
  SAVE_AD_ID(state, $info) {
    state.adId = $info
  },
  SAVE_USER_INFO(state, $info) {
    state.userInfo = $info
  },
  SAVE_ROUTERS_ARR(state, $routes) {
    state.routers = $routes;
  }
};
