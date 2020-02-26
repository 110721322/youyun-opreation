<template>
  <div
    class="app-wrapper"
    :class="openSlider == 1 ? 'openSidebar' : 'hideSidebar'"
  >
    <sidebar class="sidebar-container" style="float:left;background:#001529" />
    <div
      style="width:144px;height:100%;background-color:#fff;float:left;position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 155px;
    z-index: 1000;"
      v-if="menu2Data && rootPath"
    >
      <el-menu
        :default-active="this.$route.path"
        :router="true"
        class="el-menu-vertical-demo"
        style="height:100%;border:none;box-shadow:5px 0px 9px 0px rgba(0,0,0,0.05);"
      >
        <div :key="key" v-for="(item, key) of menu2Data">
          <el-submenu :index="rootPath + '/' + item.path" v-if="item.children">
            <template slot="title">
              <span>{{ item.text }}</span>
            </template>
            <div :key="childKey" v-for="(childItem, childKey) of item.children">
              <el-menu-item
                :index="'/' + rootPath + '/' + item.path"
                v-if="item.isShow"
                >{{ childItem.text }}</el-menu-item
              >
            </div>
          </el-submenu>

          <el-menu-item
            :index="'/' + rootPath + '/' + item.path"
            v-if="!item.children && item.isShow"
          >
            <span slot="title">{{ item.text }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>

    <div
      class="main-container"
      :class="[menu2Data && rootPath ? 'addMargin' : '']"
    >
      <navbar />

      <app-main style="width:100%;height:calc(100% - 50px);" />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, Navbar } from './components';
import { EventBus } from './bus/event-bus.js';

export default {
    name: 'Layout',
    components: {
        AppMain,
        Navbar,
        Sidebar,
    },
    data () {
        return {
            openSlider: 1,
            menu2Data: '',
            rootPath: '',
        };
    },
    created () {
        // eslint-disable-next-line no-console
        console.log('this.$router');
        // eslint-disable-next-line no-console
        console.log(this.$router);
        if (localStorage.getItem('openSlider') == null) {
            localStorage.setItem('openSlider', 1);
        } else {
            this.openSlider = localStorage.getItem('openSlider');
        }

        this.menu2Data = JSON.parse(localStorage.getItem('menu2Data'));
        this.rootPath = JSON.parse(localStorage.getItem('rootPath'));
    },
    //   mixins: [ResizeMixin],
    mounted () {
        EventBus.$on('decreased', () => {
            this.openSlider = localStorage.getItem('openSlider');
        });

        EventBus.$on('selectItem', () => {
            this.menu2Data = JSON.parse(localStorage.getItem('menu2Data'));
            this.rootPath = JSON.parse(localStorage.getItem('rootPath'));
        });
    },
    computed: {
        classObj () {
            return {
                hideSidebar: true,
                openSidebar: false,
            };
        },
    },
    methods: {},
};
</script>
<style lang="scss">
@import '~@/assets/css/index.scss';
.addMargin {
  margin-left: 300px !important;
}
.el-submenu .el-menu-item {
  min-width: 144px !important;
}
.app-wrapper {
  height: 100%;
}
</style>
