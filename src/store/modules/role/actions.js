import utils from "youyun-vue-components/global/kit/utils";

export default {
  setRoleRoutes: ({ commit }, $routes) => {
    $routes = utils.mapNestedArr($routes, 'children', mapRoutes);
    function mapRoutes($route) {
      return {
        text: $route.text ? $route.text : $route.menuName,
        type: 'ios-paper',
        path: $route.path ? $route.path : $route.routerPath,
        name: $route.name ? $route.name : $route.routerName,
        isShow: true,
        meta: {
          title: $route.text ? $route.text : $route.menuName,
          icon: $route.icon ? $route.icon : $route.menuIcon
        },
        children: $route.children
      }
    }
    commit('SET_ROLE_ROUTES', $routes)
  },
  setRolePermission: ({ commit }, info) => {
    commit('SET_ROLE_PERMISSION', info)
  }
};
