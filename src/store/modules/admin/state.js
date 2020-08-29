const state = {
  accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null, // 授权口令
  userInfo: null, // 登录角色信息
  routers: [],
  socketOptions: null, // websocket变量
  todoList: {}
}
export default state;
