import io from "socket.io-client";
import { Message } from 'element-ui';
function errorCallback(message, type) {
  Message({
    message: message || "出现错误，请稍后再试",
    duration: 2000,
    type: type || 'error'
  })
}

export default {
  saveAccessToken: ({ commit }, $info) => {
    commit('SAVE_ACCESS_TOKEN', $info)
  },
  saveUserInfo: ({ commit }, $info) => {
    commit('SAVE_USER_INFO', $info)
  },
  saveRoutersArr: ({ commit }, $info) => {
    commit('SAVE_ROUTERS_ARR', $info)
  },
  saveWebsocketOption: ({ commit, state }, $option) => {
    commit('SAVE_WEBSOCKET_OPTION', $option);
    console.log(process.env.VUE_APP_WSURL);
    const url = process.env.VUE_APP_WSURL;
    const socket = io(url, {transports: ['websocket'], query: state.socketOptions});
    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        console.log('connect', socket.connected);
      })
      socket.on('error', (error) => {
        console.error(error)
        reject(error);
      });
      socket.on('login', (res) => {
        res.data.event = 'login'
        if (res.data.status === 0) {
          resolve(res.data)
        } else if (res.data.status === 1 && res.data.code !== null) {
          errorCallback(res.data.errorMessage, 'warning')
          resolve(res.data)
        } else {
          errorCallback(res.data.errorMessage, 'error')
          reject(res.data)
        }
      })
    })
  }
};
