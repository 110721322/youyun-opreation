<template>
  <div>
    <el-menu :default-active="currRouter" :router="true" class="el-menu-vertical-demo">
      <div v-for="(item, key) of menu2Data" :key="key">
        <el-submenu v-if="item.children" :index="'/'+rootPath + '/' + item.path">
          <template slot="title">
            <span>{{ item.text }}</span>
          </template>
          <div v-for="(childItem, childKey) of item.children" :key="childKey">
            <el-menu-item
              v-if="item.isShow"
              :index="'/' + rootPath + '/' + item.path+'/'+childItem.path"
              @click="onClick_item"
            >{{ childItem.text }}</el-menu-item>
          </div>
        </el-submenu>
        <el-menu-item
          v-if="!item.children && item.isShow"
          :index="'/' + rootPath + '/' + item.path"
          @click="onClick_item"
        >
          <span slot="title">{{ item.text }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
// import AppLink from './Link'
// import { EventBus } from "../../bus/event-bus.js";

export default {
  name: "Sidebar2",
  props: {
    menu2Data: Array,
    rootPath: String
  },
  data() {
    return {
      currRouter: ""
    };
  },
  $route(to, from) {
    this.currRouter = this.$route.path;
  },
  // components: { AppLink },
  created() {
    this.currRouter = this.$route.path;
  },
  methods: {
    onClick_item() {}
  }
};
</script>
