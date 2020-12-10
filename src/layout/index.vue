<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <logo :collapse="false"/>
      <div class="slidebar-menu">
        <div style="height: auto" @mouseleave="leave">
          <sidebar style="background:#001529" :active-name="activeName"/>
          <div
              v-if="showMenu2 && menuHoverData && menuHoverData.children && menuHoverData.children.length > 0"
              class="menu2"
              @mouseleave="leave"
          >
            <menu2 :menu2-data="menuHoverData.children" :root-path="menuHoverData.path"></menu2>
          </div>
          <div
              v-else-if="showMenu2 && routeMenuData && routeMenuData.children && routeMenuData.children.length > 0"
              class="menu2"
          >
            <menu2 :menu2-data="routeMenuData.children" :root-path="routeMenuData.path"></menu2>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container" :class="[showMenu2 ? 'addMargin' : '']">
      <navbar/>
      <app-main style="width:100%;height:calc(100% - 50px);"/>
      <!-- <div style="padding-bottom: 24px;color:#909399;text-align:center;background:rgb(240, 242, 245);">杭州火脸科技有限公司 @Copyright 2020.All Rights Reserved.</div> -->
    </div>
  </div>
</template>

<script>
  import {AppMain, Sidebar, Navbar} from "./components";
  import {EventBus} from "./bus/event-bus.js";
  import menu2 from "./components/Sidebar/menu2";
  import Logo from "./components/Sidebar/Logo";

  export default {
    name: "Layout",
    components: {
      AppMain,
      Navbar,
      Sidebar,
      menu2,
      Logo
    },

    data() {
      return {
        activeName: "",
        menu2Data: "",
        menuHoverData: null,
        menuHoverShow: false
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
          } else {
            return false
          }
        } else {
          return false
        }
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
        this.menuHoverShow = true;
        this.menuHoverData = $item;
      });

      EventBus.$on("leaveSlideBar", () => {
        this.leaveSlideBar()
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
        this.menuHoverShow = false;
        this.menuHoverData = null;
      },
      leaveContainer() {
        this.menuHoverShow = false;
      },
      leaveSlideBar() {
        if (!(this.menuHoverData && this.menuHoverData.children && this.menuHoverData.children.length > 0)) {
          this.menuHoverShow = false;
          this.menuHoverData = null;
        }
      }
    }
  };
</script>
<style lang="scss">
  @import "~@/assets/css/index.scss";

  .addMargin {
    margin-left: 285px !important;
  }

  .el-submenu .el-menu-item {
    min-width: 144px !important;
  }

  .app-wrapper {
    height: 100%;
  }

  .menu2 {
    width: 148px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 5px 0px 9px 0px rgba(0, 0, 0, 0.05);
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1003;
    left: 137px;
  }

  .menu22 {
    width: 166px;
    height: 100%;
    background-color: #fff;
    float: left;
    position: absolute;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 127px;
    z-index: 1001;
  }

  .sidebar-container {
    height: 100%;
    position: relative;
    /*overflow: hidden;*/
  }

  .slidebar-menu {
    height: calc(100% - 50px);
    width: 138px;
    overflow-y: auto;
  }
</style>
