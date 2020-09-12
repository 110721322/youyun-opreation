<template>
  <div style="height: 100%">
    <logo :collapse="isCollapse" />
    <!-- <el-scrollbar> -->
    <div class="slidebar-container">
      <el-menu :default-active="activeName" :collapse="openSlider == 1 ? false : true" :unique-opened="false" :collapse-transition="false" mode="vertical" background-color="#001529" text-color="#A6ADB4">
        <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </div>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
// import variables from '@/assets/css/variables.scss'
import { EventBus } from "../../bus/event-bus.js";
import store from '@/store'

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
      // const menus = localStorage.getItem("menus");
      // return JSON.parse(menus);
      const menus = store.state.role.routes;
      return menus;
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
  },
  methods: {
    leaveSlideBar() {
      EventBus.$emit("leaveSlideBar")
    }
  }
};
</script>
<style scoped lang="scss">
  .slidebar-container {
    height: calc(100% - 50px);
    width: 160px;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>

