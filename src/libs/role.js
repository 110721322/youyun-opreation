import store from '@/store'
import utils from './kit/utils'


/**
 * @param routes 路由名称
 * @type {computedRoleRouter}
 */
const computedRoleRouter = ((routes) => {
  let buttonList;

  routes = utils.filterNestedArr(routes,'children','isShow');
  buttonList = computedRoleBtn(routes);

  store.dispatch('setRoleRoutes',routes);
  store.dispatch('setRolePermission',buttonList);

  return routes;
})

const computedRoleBtn = ((routes) => {
  let buttonList = [],    //权限按钮集合
      childrenList = [];  //主菜单+子菜单集合

  childrenList = utils.getNestedArr(routes, 'children')
  buttonList = utils.getNestedArr(childrenList, 'buttonList',false);

  //所有按钮已取出，删除按钮对象内的buttonList;
  buttonList.forEach(button => {
    delete button['buttonList'];
  })

  return buttonList;
})

export {computedRoleRouter};