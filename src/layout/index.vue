<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <div style="max-height: 100%;" @mouseleave="leave">
        <sidebar style="background:#001529;" :active-name="activeName" />
        <div
          v-if="showMenu2 && menuHoverData && menuHoverData.children && menuHoverData.children.length > 0"
          class="menu2"
          @mouseleave="leave"
        >
          <menu2 :menu2-data="menuHoverData.children"></menu2>
        </div>
        <div
          v-else-if="showMenu2 && routeMenuData && routeMenuData.children && routeMenuData.children.length > 0"
          class="menu2"
        >
          <menu2 :menu2-data="routeMenuData.children"></menu2>
        </div>
      </div>
    </div>

    <div class="main-container" :class="[showMenu2 ? 'addMargin' : '']">
      <navbar />
      <app-main style="width: 100%; height: calc(100% - 50px);" />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, Navbar } from "./components";
import { EventBus } from "./bus/event-bus.js";
import menu2 from "./components/Sidebar/menu2";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar,
    menu2
  },

  data() {
    return {
      activeName: "",
      menuHoverData: null
    };
  },

  computed: {
    routeMenuData() {
      const routeParentName = this.$route.path.split('/').filter(item => item !== '')[0];
      const menus = this.$store.state.role.routes;
      let routeMenuData = null;
      menus.forEach(menu => {
        if (routeParentName === menu.name) {
          routeMenuData = menu;
          return;
        }
      })
      return routeMenuData;
    },
    showMenu2() {
      if (this.menuHoverData && this.menuHoverData.children && this.menuHoverData.children.length > 0) {
        return true
      } else if (this.$g.utils.isObj(this.routeMenuData)) {
        if (this.routeMenuData.children && this.routeMenuData.children.length > 0) {
          return true
        }
      }
      return false
    }
  },
  watch: {
    $route(to, from) {
      this.getActiveName();
      this.$nextTick();
    }
  },

  created() {
    this.getActiveName();
  },
  mounted() {
    EventBus.$on("enterItem", $item => {
      this.menuHoverData = $item;
    });
  },
  methods: {
    getActiveName() {
      const menus = this.$store.state.role.routes;
      const currRouterName = this.$route.path.split('/').filter(item => item !== '')[0];
      const activeMenu = menus.filter(item => item.name === currRouterName)[0]
      if (activeMenu) {
        this.activeName = activeMenu.name;
      }
    },
    leave() {
      this.menuHoverData = null;
    }
  }
};
</script>
<style lang="scss">
  @import "~@/assets/css/index.scss";
  .addMargin {
    margin-left: 326px !important;
  }
  .el-submenu .el-menu-item {
    min-width: 144px !important;
  }
  .app-wrapper {
    height: 100%;
  }

  .menu2 {
    width: 166px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 5px 0px 9px 0px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: 1003;
    left: 160px;
  }
  .sidebar-container {
    height: 100%;
    overflow: hidden;
  }
</style>
