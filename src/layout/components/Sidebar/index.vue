<template>
  <div>
    <logo :collapse="isCollapse" />
    <el-scrollbar >
      <el-menu
        :collapse="openSlider == 1 ? false : true"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        background-color='#001529'
        text-color='#FFFFFF'
      >
        <sidebar-item
          v-for="route in menuList"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo';
import SidebarItem from './SidebarItem';
// import variables from '@/assets/css/variables.scss'
import { EventBus } from '../../bus/event-bus.js';

export default {
    components: { SidebarItem, Logo },
    created () {
        this.openSlider = localStorage.getItem('openSlider');
    },
    data () {
        return {
            openSlider: 1,
        };
    },
    mounted () {
        EventBus.$on('decreased', () => {
            this.openSlider = localStorage.getItem('openSlider');
        });
    },
    computed: {
        activeMenu () {
            const route = this.$route;
            const { meta, path } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        menuList () {
            let menus = localStorage.getItem('menus');
            return JSON.parse(menus);
        },
        variables () {
            return '';
        },
        permission_routes () {
            return [];
        },
        isCollapse () {
            return true;
        },
    },
};
</script>
