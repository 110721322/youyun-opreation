<template>
  <div>
    <el-menu class="el-menu-vertical-demo" style="border-right: 0;" :default-openeds="[subMenuName]">
      <div v-for="(item, key) of menu2Data" :key="key">
        <el-submenu v-if="item.children && item.children.length>0" :index="item.name" class="el-submenu">
          <template slot="title">
            <span>{{ item.text }}</span>
          </template>
          <div v-for="(childItem, childKey) of item.children" :key="childKey">
            <template>
              <el-menu-item
                v-if="childItem.isShow"
                class="el-menu-item"
                :class="($route.name==childItem.name || $route.meta.fatherName === childItem.name) ? 'active' : ''"
                :index="childItem.name"
                @click="onClick_item(childItem)"
              >{{ childItem.text }}</el-menu-item>
            </template>
          </div>
        </el-submenu>

        <template v-else>
          <el-menu-item
            class="el-menu-item"
            :index="item.name"
            :class="($route.name==item.name || $route.meta.fatherName === item.name) ? 'active' : ''"
            @click="onClick_item(item)"
          >
            <span slot="title">{{ item.text }}</span>
          </el-menu-item>
        </template>
      </div>
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
      subMenuName: ""
    };
  },
  watch: {
    $route: function() {
      this.subMenuName = this.$route.meta.subMenuName;
      this.$nextTick();
    },
    menu2Data: function() {
      this.subMenuName = this.$route.meta.subMenuName;
      this.$nextTick();
    }
  },
  created() {
    this.subMenuName = this.$route.meta.subMenuName;
  },
  methods: {
    onClick_item($item) {
      console.log($item);
      this.$router.push({name: $item.name})
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
    padding-right: 0;
    &:hover {
      background: #ECEDF1 !important;
    }
  }
  .active {
    background: #ECEDF1 !important;
    color: #333335;
  }
  .el-submenu {
    /deep/ .el-submenu__title {
      height: 38px;
      line-height: 38px;
      margin-bottom: 8px;
      font-size: 14px;
      color: #333335;
      &:hover {
        background: #ECEDF1 !important;
      }
    }
  }
</style>
