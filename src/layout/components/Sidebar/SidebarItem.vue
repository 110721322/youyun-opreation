<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          @click="onClick_item"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <!-- <li
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
      class="el-menu-item"
      @mouseleave="leave(item)"
      @mouseenter="enter(item)"
    > -->
    <div v-else @mouseleave="leave(item)" @mouseenter="enter(item)">
      <el-menu-item
        :index="resolvePath(item.path)"
        popper-append-to-body
        class="el-menu-item"
      >
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
        <div v-show="showMenu2" class="menu2">
          <menu2 :menu2Data="menu2Data" :rootPath="item.path"></menu2>
        </div>
      </el-menu-item>
    </div>

    <!-- </li> -->
  </div>
</template>

<script>
import path from 'path';
import { isExternal } from '@/libs/kit/validate';
import Item from './Item';
import AppLink from './Link';
import FixiOSBug from './FixiOSBug';
import menu2 from './menu2.vue';
import { EventBus } from '../../bus/event-bus.js';

export default {
    name: 'SidebarItem',
    components: { Item, AppLink, menu2 },
    mixins: [FixiOSBug],
    props: {
    // route object
        item: {
            type: Object,
            required: true,
        },
        isNest: {
            type: Boolean,
            default: false,
        },
        basePath: {
            type: String,
            default: '',
        },
    },
    created () {
    // eslint-disable-next-line no-console
        console.log(this.item);
    },
    data () {
        this.onlyOneChild = null;
        return {
            showMenu2: false,
            menu2Data: [],
        };
    },
    methods: {
        hasOneShowingChild (children = [], parent) {
            // const showingChildren = children.filter(item => {

            //   if (item.hidden) {
            //     return false
            //   } else {
            //     // Temp set(will be used if only has one showing child)
            //     this.onlyOneChild = item
            //     return true
            //   }
            // })

            // // When there is only one child router, the child router is displayed by default
            // if (showingChildren.length === 1) {
            //   return true
            // }

            // Show parent if there are no child router to display
            if (children.length === 0) {
                this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
                return true;
            } else {
                return false;
            }
        },
        resolvePath (routePath) {
            // eslint-disable-next-line no-console
            console.log('++++');
            // eslint-disable-next-line no-console
            console.log(routePath);

            if (isExternal(routePath)) {
                return routePath;
            }
            if (isExternal(this.basePath)) {
                return this.basePath;
            }
            return path.resolve(this.basePath, routePath);
        },
        leave () {
            // eslint-disable-next-line no-console
            console.log(1);
            this.showMenu2 = false;
        },
        enter (item) {
            // eslint-disable-next-line no-console
            // console.log(item.children);
            this.menu2Data = item.children;
            this.showMenu2 = true;
        },
        onClick_item () {
            // eslint-disable-next-line no-console

            localStorage.removeItem('menu2Data');
            localStorage.removeItem('rootPath');
            EventBus.$emit('selectItem', {});
        },
    },
};
</script>

<style>
.menu2 {
  width: 144px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 5px 0px 9px 0px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  z-index: 10;
  left: 155px;
}
</style>
