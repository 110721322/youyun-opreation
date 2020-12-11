export default {
  SAVE_ACCESS_TOKEN(state, $token) {
    state.accessToken = $token;
  },
  SAVE_USER_INFO(state, $info) {
    state.userInfo = $info
  },
  SAVE_ROUTERS_ARR(state, $routes) {
    state.routers = $routes;
  },
  SAVE_KEEP_ALIVE(state, $list) {
    state.includeKeepAlive = $list;
  }
};
