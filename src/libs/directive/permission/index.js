import Vue from 'vue'
import store from '@/store'

/** 权限指令 **/
const has = Vue.directive('has', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode) {
    let btnPermissions = '';
    // 获取指令按钮权限
    let characteristic = binding.value;
    if (characteristic)
    {
      btnPermissions = new Array(characteristic);
      if (!Vue.prototype.$_has(btnPermissions))
      {
        el.parentNode.removeChild(el);
      }
    }
    /*else         // 获取路由按钮权限
    {
      console.log(vnode.context.$route);
      btnPermissions = vnode.context.$route.meta.permissions.split(',');
    }*/
  }
});

// 权限检查方法
Vue.prototype.$_has = function (value) {
  let isExist = false;
  let btnPermissionsArr = store.state.role.permission;
  if (btnPermissionsArr == undefined || btnPermissionsArr == null) {
    return false;
  }
  let res = value.filter((x) => {
    return btnPermissionsArr.includes(x)
  })
  if (res.length > 0) isExist = true;
  return isExist;
};


export default has