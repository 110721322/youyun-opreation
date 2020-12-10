<template>
  <div>
    <el-menu class="el-menu-vertical-demo" style="border-right: 0" :default-openeds="[subMenuName]">
      <template v-for="(item, key) of menu2Data">
        <el-submenu v-if="item.children && item.children.length>0" :index="item.name" :key="key">
          {{ item.text }}
          <div v-for="(childItem, childKey) of item.children" :key="childKey">
            <el-menu-item
                v-if="childItem.isShow"
                class="el-menu-item"
                :class="($route.name==childItem.name || $route.meta.fatherName === childItem.name) ? 'current-active' : ''"
                :index="childItem.name"
                @click="onClick_item(childItem.name)"
            >{{ childItem.text }}</el-menu-item>
          </div>
        </el-submenu>

        <el-menu-item
            v-else
            :key="key"
            class="el-menu-item"
            :index="item.name"
            :class="($route.name==item.name || $route.meta.fatherName === item.name) ? 'current-active' : ''"
            @click="onClick_item(item.name)"
        >
          {{ item.text }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar2",
  props: {
    menu2Data: Array,
    rootPath: String
  },
  data() {
    return {
      currRouter: "",
      subMenuName: ""
    };
  },
  $route(to, from) {
    this.currRouter = this.$route.name;
    this.subMenuName = this.$route.meta.subMenuName;
  },
  watch: {
    $route: function() {
      this.currRouter = this.$route.name;
      this.subMenuName = this.$route.meta.subMenuName;
      this.$nextTick();
    },
    menu2Data: function() {
      this.currRouter = this.$route.name;
      this.subMenuName = this.$route.meta.subMenuName;
      this.$nextTick();
    }
  },
  created() {
    this.currRouter = this.$route.name;
    this.subMenuName = this.$route.meta.subMenuName;
  },
  methods: {
    onClick_item($routerName) {
      this.$router.push({name: $routerName })
    }
  }
};
</script>
<style lang="scss" scoped>
  .el-menu {
    padding-top: 12px;
  }
  .el-menu-item {
    height: 38px;
    line-height: 38px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333335;
    &:hover {
      background: #ECEDF1 !important;
    }
  }
  .is-active {
    background: #FFFFFF !important;
  }
  .current-active {
    background: #ECEDF1 !important;
    color: #333335;
  }
</style>
