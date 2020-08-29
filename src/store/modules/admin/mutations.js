export default {
  SAVE_ACCESS_TOKEN(state, $token) {
    state.accessToken = $token;
    if ($token) {
      localStorage.setItem('accessToken', $token);
    } else {
      localStorage.removeItem('accessToken');
    }
  },
  SAVE_USER_INFO(state, $info) {
    state.userInfo = $info;
  },
  SAVE_ROUTERS_ARR(state, $routes) {
    state.routers = $routes;
  },
  SAVE_WEBSOCKET_OPTION(state, $option = null) {
    if ($option) {
      state.socketOptions = $option;
    }
  },
  SET_TODOLIST(state, $option) {
    state.todoList = $option;
  }
};
