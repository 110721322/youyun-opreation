<template>
  <div class="aaa" :style="{'height': (height*2-100)+'px', 'overflow': 'auto'}">
    <logo :collapse="isCollapse" />
    <!-- <el-scrollbar> -->
    <el-menu :default-active="activeName" :collapse="openSlider == 1 ? false : true" :unique-opened="false" :collapse-transition="false" mode="vertical" background-color="#001529" text-color="#FFFFFF">
      <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
// import variables from '@/assets/css/variables.scss'
import { EventBus } from "../../bus/event-bus.js";

export default {
  components: { SidebarItem, Logo },
  props: {
    // route object
    activeName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      openSlider: 1,
      height: `${document.documentElement.clientHeight}`
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    menuList() {
      const menus = localStorage.getItem("menus");
      return JSON.parse(menus);
    },
    variables() {
      return "";
    },
    permission_routes() {
      return [];
    },
    isCollapse() {
      return true;
    }
  },
  created() {
    this.openSlider = localStorage.getItem("openSlider");
  },
  mounted() {
    EventBus.$on("decreased", () => {
      this.openSlider = localStorage.getItem("openSlider");
    });
  }
};
</script>
