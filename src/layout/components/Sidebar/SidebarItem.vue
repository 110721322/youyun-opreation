<template>
  <div v-if="!item.hidden" @mouseleave="leave(item)" @mouseenter="enter(item)">
    <template v-if="!(item.children && item.children.length > 0 )">
      <el-menu-item :index="item.name" popper-append-to-body class="el-menu-item" @click="onClick_item(item)">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </el-menu-item>
    </template>
    <div v-else>
      <el-menu-item
        :index="item.name"
        popper-append-to-body
        class="el-menu-item"
        @click="onClick_item(item)"
      >
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/libs/kit/validate";
import Item from "./Item";
import FixiOSBug from "./FixiOSBug";
// import menu2 from "./menu2.vue";
import { EventBus } from "../../bus/event-bus.js";
export default {
  name: "SidebarItem",
  components: { Item },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    this.onlyOneChild = null;
    return {
      showMenu2: false,
      menu2Data: [],
      isMove2: 1
    };
  },
  created() {
    // console.log(this.item);
  },

  methods: {
    onClick_item($item) {
      if ($item.children && $item.children.length > 0) {
        this.$router.push({
          name: $item.children[0].name
        }).catch(err => {})
      } else {
        this.$router.push({
          name: $item.name
        }).catch(err =>{})
      }
    },
    hasOneShowingChild(children = [], parent) {
      if (children.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      } else {
        return false;
      }
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    leave() {
      // console.log(this.item);
      // this.isMove = false;
      // this.showMenu2 = false;
    },
    enter(item) {
      EventBus.$emit("enterItem", item);
    }
  }
};
</script>

<style lang="scss" scoped>
  .el-menu-item {
    /deep/ &.is-active {
      background: #1989FA;
    }
    &:hover {
      color: #FFFFFF !important;
      /deep/ i {
        color: #FFFFFF !important;
      }
    }
  }
</style>
