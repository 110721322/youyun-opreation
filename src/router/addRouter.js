import Layout from '@/layout/index.vue'
const asyncRoutes = {
}
const routers = []
const menusToRoutes = function (data) {
  const result = []
  data.forEach(item => {
    const curr = asyncRoutes[item.name];
    if (curr) {
      if (curr.path && curr.path[0] !== "/") {
        curr.path = "/" + curr.path;
      }
      if (item.children && item.children.length > 0) {
        item.children.forEach(item2 => {
          generateRoutes(curr.children, item2)
        })
      }
      result.push(curr)
    } else {
      console.error(`not find page ${item.name} , page's title is ${item.meta.title}`);
    }
  })
  result.push({ path: '*', redirect: '/error' })
  return result
}

const getRouters = function () {
  return routers[0].children
}

const generateRoutes = function (children, item) {
  if (item.name) {
    const page = asyncRoutes[item.name];
    if (page) {
      if (page.path && page.path[0] === "/") {
        page.path = page.path.slice(1)
      }
      children.push(page)
    } else {
      console.error(`not find page ${item.name} , page's title is ${item.meta.title}`);
    }
  }

  if (item.children) {
    item.children.forEach(e => {
      generateRoutes(asyncRoutes[item.name].children, e)
    })
  }
}

export default {
  menusToRoutes: menusToRoutes,
  getRouters: getRouters
}
