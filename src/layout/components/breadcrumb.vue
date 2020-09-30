<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item v-if="index > 0 && index < levelList.length && !item.meta.noRedirect" :key="item.name" :to="{name: item.name}">
          <span v-if="$route.name!==item.name" class="redirect">{{ item.meta.title }}</span>
          <span v-else>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else :key="item.name">
          <span v-if="$route.name!==item.name" class="no-redirect">{{ item.meta.title }}</span>
          <span v-else>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      levelList: null
    };
  },
  computed: {
    ...mapState({
      routers: (state) => state.admin.routers
    })
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const routers = this.$g.utils.deepClone(this.routers);
      const routeNames = this.$route.path.split("/").filter(item => item !== "");
      const nestedRouters = this.$g.utils.getNestedArr(routers, 'children');
      this.levelList = routeNames.map(item => {
        const route = nestedRouters.filter(router => router.name === item)[0]
        return {
          name: route.name,
          path: route.path,
          meta: route.meta
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 24px;

    .redirect {
      color: #909399;
      cursor: text;
      &:hover {
        color: #606266;
        cursor: pointer;
      }
    }
    .no-redirect {
      color: #909399;
      cursor: text;
      &:hover {
        color: #606266;
      }
    }
  }
</style>
