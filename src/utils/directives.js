// 菜单按钮的权限

import Vue from 'vue';
Vue.directive('has', {
  inserted: function (el, binding) {
    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el);
    }

    function permissionJudge(value) {
      // 此处store.getters.getMenuBtnList代表vuex中储存的按钮菜单数据
      // let list = store.getters.getMenuBtnList;
      const list = []
      for (const item of list) {
        if (item.permission === value) {
          return true;
        }
      }
      return false;
    }
  }
})
