<template>
  <div style="height: 100%">
    <logo :collapse="isCollapse" />
    <!-- <el-scrollbar> -->
    <div class="slidebar-container">
      <el-menu
        :default-active="activeName"
        :collapse="false"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        background-color="#001529"
        text-color="#A6ADB4"
      >
        <sidebar-item v-for="route in menuList" :key="route.path" :item="route" />
      </el-menu>
    </div>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

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
      isCollapse: true
    };
  },
  computed: {
    menuList() {
      return this.$g.utils.deepClone(this.$store.state.role.routes);
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
  /*滚动条样式*/
  .slidebar-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .slidebar-container::-webkit-scrollbar-thumb {
    background: #C3C3C3;
    border-radius: 4px;
  }
  .slidebar-container::-webkit-scrollbar-track {
    background: white;
    border-radius: 4px;
  }
</style>

