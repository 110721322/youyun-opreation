<template>
  <div class="app-wrapper" :class="openSlider == 1 ? 'openSidebar' : 'hideSidebar'">
    <div class="sidebar-container">
      <div @mouseleave="leave()" @mouseenter="enter()">
        <sidebar style="float:left;background:#001529" />
      </div>
    </div>

    <div
      v-if="showMenu2&&menuHoverData.isShow"
      class="menu2"
      @mouseleave="leave()"
      @mouseenter="enter()"
    >
      <menu2 :menu2-data="menuHoverData.children" :root-path="menuHoverData.path"></menu2>
    </div>

    <div
      v-if="menu2Data && rootPath"
      class="menu2"
      style="width:166px;height:100%;background-color:#fff;float:left;position: absolute;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 133px;
    z-index: 1001;"
    >
      <menu2 :menu2-data="menu2Data" :root-path="rootPath"></menu2>

      <!-- <el-menu
        :default-active="currRouter"
        :router="true"
        class="el-menu-vertical-demo"
        style="height:100%;border:none;box-shadow:5px 0px 9px 0px rgba(0,0,0,0.05);"
      >
        <div v-for="(item, key) of menu2Data" :key="key">
          <el-submenu v-if="item.children" index="rootPath + '/' + item.path">
            <template slot="title">
              <span>{{ item.text }}</span>
            </template>
            <div v-for="(childItem, childKey) of item.children" :key="childKey">
              <el-menu-item
                v-if="item.isShow"
                :index="'/' + rootPath + '/' + item.path"
              >{{ childItem.text }}</el-menu-item>
            </div>
          </el-submenu>

          <el-menu-item
            v-if="!item.children && item.isShow"
            :index="'/' + rootPath + '/' + item.path"
          >
            <span slot="title">{{ item.text }}</span>
          </el-menu-item>
        </div>
      </el-menu>-->
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
      openSlider: 1,
      menu2Data: "",
      rootPath: "",
      showMenu2: false,
      currRouter: "",
      menuHoverData: {}
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
    }
  },

  created() {
    this.matchMenu();

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
      const menus = JSON.parse(localStorage.getItem("menus"));
      menus.forEach(item => {
        if (item.isShow && item.children) {
          item.children.forEach(childItem => {
            if (childItem.name === this.$route.name) {
              this.menu2Data = item.children;

              this.rootPath = item.path;
              this.currRouter = this.$route.path;
              return;
            }
          });
        } else {
          if (item.name === this.$route.name) {
            this.menu2Data = "";
          }
        }
      });
    },
    leave() {
      this.showMenu2 = false;
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
</style>
