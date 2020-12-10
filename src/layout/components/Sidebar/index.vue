<template>
  <div style="height: 100%">
    <el-menu
        :default-active="activeName"
        :collapse="false"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        background-color="#001529"
        text-color="#A6ADB4">
      <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </div>
</template>

<script>
  import SidebarItem from "./SidebarItem";
  import {EventBus} from "../../bus/event-bus.js";

  export default {
    components: {SidebarItem},
    props: {
      // route object
      activeName: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        height: `${document.documentElement.clientHeight}`
      };
    },
    computed: {
      activeMenu() {
        const route = this.$route;
        const {meta, path} = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      },
      menuList() {
        return this.$g.utils.deepClone(this.$store.state.role.routes);
      },
      variables() {
        return "";
      },
      isCollapse() {
        return false;
      }
    },
    methods: {
      leaveSlideBar() {
        EventBus.$emit("leaveSlideBar")
      }
    }
  };
</script>
<style scoped lang="scss">
  .slidebar-menu {
    height: calc(100% - 50px);
    width: 138px;
    overflow-y: auto;
  }
</style>
