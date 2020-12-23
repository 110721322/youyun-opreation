import utils from "youyun-vue-components/global/kit/utils";

export default {
  /**
   * 添加一条新的登录记录在头部
   * @param commit
   * @param state
   * @param $phone  添加账号
   */
  addLoginHistory: ({ commit, state }, $phone) => {
    let loginHistory = utils.deepClone(state.loginHistory).filter(phone => {
      return  !!phone && phone !== $phone
    });
    loginHistory.unshift($phone);
    commit('SET_LOGIN_HISTORY', loginHistory);
  },
  /**
   * 移除其中一条记录
   * @param commit
   * @param state
   * @param $index  要移除记录的下标
   */
  removeHistory: ({ commit, state }, $index) => {
    let loginHistory = utils.deepClone(state.loginHistory);
    loginHistory.splice($index, 1);
    commit('SET_LOGIN_HISTORY', loginHistory);
  }
};
