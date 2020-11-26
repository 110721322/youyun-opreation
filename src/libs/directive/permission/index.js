import Vue from 'vue'
import store from '@/store'

/** 权限指令 **/
const has = Vue.directive('has', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function ($el, $binding, $vnode) {
    let btnPerId = $binding.value;
    if (btnPerId)
    {
      if (!Vue.prototype.$_has(btnPerId))
      {
        $el.parentNode.removeChild($el);
      }
    }
  }
});

// 权限检查方法
Vue.prototype.$_has = function ($value) {
  let isExist = false;
  let btnPermissionsArr = store.state.role.permission;
  let result;
  if (btnPermissionsArr === undefined || btnPermissionsArr === null) {
    return false;
  }
  result = btnPermissionsArr.filter(($ele) => {
    return $ele['buttonId'] === $value && $ele.isShow
  })
  if (result.length > 0) isExist = true;
  return isExist;
};


export default has
