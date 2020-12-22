import utils from "youyun-vue-components/global/kit/utils";

export default {
  setRoleRoutes: ({ commit }, $routes) => {
    $routes = utils.mapNestedArr($routes, 'children', mapRoutes);
    function mapRoutes($route) {
      return {
        text: $route.text,
        path: $route.path,
        name: $route.name,
        isShow: true,
        meta: {
          title: $route.text,
          icon: $route.meta.icon ? $route.meta.icon : $route.icon
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
