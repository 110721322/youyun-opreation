<template>
  <div>
    <el-menu
      :default-active="this.$route.path"
      :router="true"
      class="el-menu-vertical-demo"
    >
      <div :key="key" v-for="(item, key) of menu2Data">
        <el-submenu :index="rootPath + '/' + item.path" v-if="item.children">
          <template slot="title">
            <span>{{ item.text }}</span>
          </template>
          <div  :key="childKey" v-for="(childItem, childKey) of item.children">
            <el-menu-item
              @click="onClick_item"
              :index="'/' + rootPath + '/' + item.path"
              v-if="item.isShow"
              >{{ childItem.text }}</el-menu-item
            >
          </div>
        </el-submenu>

        <el-menu-item
          @click="onClick_item"
          :index="'/' + rootPath + '/' + item.path"
          v-if="!item.children && item.isShow"
        >
          <span slot="title">{{ item.text }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
// import AppLink from './Link'
import { EventBus } from '../../bus/event-bus.js';

export default {
    name: 'Sidebar2',
    // components: { AppLink },
    created () {},
    data () {
        return {};
    },
    props: {
        menu2Data: Array,
        rootPath: String,
    },
    methods: {
        onClick_item () {
            // eslint-disable-next-line no-console
            localStorage.setItem('menu2Data', JSON.stringify(this.menu2Data));
            localStorage.setItem('rootPath', JSON.stringify(this.rootPath));
            // this.menu2Data
            EventBus.$emit('selectItem', {});
        },
    },
};
</script>
