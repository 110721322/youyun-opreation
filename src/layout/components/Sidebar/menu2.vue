<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      style="border-right: 0;"
      :default-openeds="[secondName]">
      <div v-for="(item, key) of menu2Data" :key="key">
        <el-submenu
          v-if="item.children && item.children.length>0"
          :index="item.name"
          class="el-submenu">
          <template slot="title">
            <span>{{ item.text }}</span>
          </template>
          <div v-for="(childItem, childKey) of item.children" :key="childKey">
            <template>
              <el-menu-item
                v-if="childItem.isShow"
                class="el-menu-item third-menu-item"
                :class="(thirdName === childItem.name) ? 'active' : ''"
                :index="childItem.name"
                @click="clickItem(childItem)"
              >{{ childItem.text }}</el-menu-item>
            </template>
          </div>
        </el-submenu>

        <template v-else>
          <el-menu-item
            class="el-menu-item"
            :index="item.name"
            :class="(secondName === item.name) ? 'active' : ''"
            @click="clickItem(item)"
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
  computed: {
    secondName() {
      return this.$route.path.split("/").filter(item => item !== '')[1];
    },
    thirdName() {
      return this.$route.path.split("/").filter(item => item !== '')[2];
    }
  },
  methods: {
    clickItem($item) {
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
    &.third-menu-item {
      padding-left: 30px !important;
    }
    &:hover {
      color: #606266;
      background: #ECEDF1 !important;
    }
  }
  .active {
    background: #ECEDF1 !important;
    color: #606266;
    &:hover {
      background: #ECEDF1 !important;
      color: #333335;
    }
  }
  .el-submenu {
    /deep/ .el-submenu__title {
      height: 38px;
      line-height: 38px;
      margin-bottom: 8px;
      font-size: 14px;
      color: #333335;
      &:hover {
        color: #606266;
        background: #ECEDF1 !important;
      }
    }
  }
</style>
