import store from '@/store'
import utils from 'youyun-vue-components/global/kit/utils'

const routeList = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 4,
            children: []
          },
          {
            id: 5,
            children: []
          }
        ]
      },
      {
        id: 3,
        children: [
          {
            id: 6,
            children: []
          },
          {
            id: 7,
            children: []
          }
        ]
      }
    ]
  }
]


/**
 * @param routes 路由名称
 * @type {computedRoleRouter}
 */
const computedRoleRouter = ((routes) => {
  let buttonList;

  routes = utils.filterNestedArr(routes,'children');
  // buttonList = computedRoleBtn(routes);

  store.dispatch('setRoleRoutes',routes);
  // store.dispatch('setRolePermission',buttonList);

  return routes;
})

const computedRoleBtn = ((routes) => {
  let buttonList = [],    //权限按钮集合
      childrenList = [];  //主菜单+子菜单集合

  childrenList = utils.getNestedArr(routes, 'children')
  childrenList = childrenList.sort(($child1,$child2) => {
    return $child1.menuId - $child2.menuId
  })

  //过滤不显示的按钮
  childrenList = utils.filterNestedArr(childrenList,'buttonList','isShow');
  //提取所有按钮
  buttonList = utils.getNestedArr(childrenList, 'buttonList',false);
  //按buttonId升序排列
  buttonList = buttonList.sort(($button1,$button2) => {
    return $button1.buttonId - $button2.buttonId
  })

  //所有按钮已取出，删除按钮对象内的buttonList;
  buttonList.forEach(button => {
    delete button['buttonList'];
  })

  return buttonList;
})

export {computedRoleRouter};
