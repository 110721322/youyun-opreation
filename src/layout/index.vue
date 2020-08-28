<template>
  <div class="app-wrapper" :class="openSlider == 1 ? 'openSidebar' : 'hideSidebar'">
    <div class="sidebar-container">
      <div @mouseleave="leave()" @mouseenter="enter()">
        <sidebar style="float:left;background:#001529" :active-name="activeName" />
      </div>
    </div>

    <div
      v-if="showMenu2&&menuHoverData.children && menuHoverData.children.length > 0"
      class="menu2"
      @mouseleave="leave()"
      @mouseenter="enter()"
    >
      <menu2 :menu2-data="menuHoverData.children" :root-path="menuHoverData.path"></menu2>
    </div>

    <div v-if="menu2Data && rootPath" class="menu2 menu22">
      <menu3 :menu2-data="menu2Data" :root-path="rootPath"></menu3>
    </div>

    <div class="main-container" :class="[menu2Data && rootPath ? 'addMargin' : '']">
      <navbar />
      <app-main style="width:100%;height:calc(100% - 50px);" />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, Navbar } from "./components";
import { EventBus } from "./bus/event-bus.js";
import menu2 from "./components/Sidebar/menu2";
import menu3 from "./components/Sidebar/menu3";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar,
    menu2,
    menu3
  },

  data() {
    return {
      activeName: "",
      openSlider: 1,
      menu2Data: "",
      rootPath: "",
      showMenu2: false,
      currRouter: "",
      menuHoverData: {},
      isShowMenu: true
    };
  },

  computed: {
    classObj() {
      return {
        hideSidebar: true,
        openSidebar: false
      };
    }
  },
  watch: {
    $route(to, from) {
      this.matchMenu();
      this.getActiveName();
      this.$nextTick();
      this.isShowMenu = false;
      setTimeout(() => {
        this.isShowMenu = true;
      }, 100);
    }
  },

  created() {
    this.matchMenu();
    this.getActiveName();
    if (localStorage.getItem("openSlider") == null) {
      localStorage.setItem("openSlider", 1);
    } else {
      this.openSlider = localStorage.getItem("openSlider");
    }
  },
  mounted() {
    EventBus.$on("decreased", () => {
      this.openSlider = localStorage.getItem("openSlider");
    });

    EventBus.$on("enterItem", $item => {
      this.menuHoverData = $item;
    });
  },
  methods: {
    matchMenu() {
      const menus = this.$store.state.role.routes;
      menus.forEach(item => {
        if (item.isShow && item.children) {
          item.children.forEach(childItem => {
            if (childItem.children) {
              childItem.children.forEach(child2Item => {
                if (child2Item.name === this.$route.name) {
                  this.menu2Data = item.children;
                  this.rootPath = item.path;
                  this.currRouter = this.$route.path;
                  return;
                }
              });
            } else {
              if (childItem.name === this.$route.meta.fatherName) {
                this.menu2Data = item.children;
                this.rootPath = item.path;
                this.currRouter = this.$route.path;
                return;
              }
              if (childItem.name === this.$route.name) {
                this.menu2Data = item.children;
                this.rootPath = item.path;
                this.currRouter = this.$route.path;
                return;
              }
            }
          });
        } else {
          if (item.name === this.$route.name) {
            this.menu2Data = "";
          }
        }
      });
    },
    getActiveName() {
      const menus = this.$store.state.role.routes;
      let currRouterName;
      if (this.$route.meta.fatherName) {
        currRouterName = this.$route.meta.fatherName;
      } else {
        currRouterName = this.$route.name;
      }
      menus.forEach(item => {
        if (item.name === currRouterName) {
          this.activeName = item.name;
        } else {
          if (item.children) {
            item.children.forEach(childItem => {
              if (childItem.name === currRouterName) {
                this.activeName = item.name;
              } else {
                if (childItem.children) {
                  childItem.children.forEach(childItem2 => {
                    if (childItem2.name === currRouterName) {
                      this.activeName = item.name;
                    }
                  });
                }
              }
            });
          }
        }
      });
      this.openSlider = localStorage.getItem("openSlider");
    },
    leave() {
      // this.showMenu2 = false;
    },
    enter(item) {
      this.showMenu2 = true;
    }
  }
};
</script>
<style lang="scss">
@import "~@/assets/css/index.scss";
.addMargin {
  margin-left: 300px !important;
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
  position: fixed;
  top: 0;
  z-index: 1003;
  left: 133px;
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
  left: 133px;
  z-index: 1001;
}
.sidebar-container {
  height: 100%;
  overflow: hidden;
}
</style>
