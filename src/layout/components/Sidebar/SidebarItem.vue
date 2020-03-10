<template>
  <div v-if="!item.hidden" @mouseleave="leave(item)" @mouseenter="enter(item)">
    <template v-if="!item.children||item.isShow==false">
      <app-link :to="resolvePath(item.path)">
        <el-menu-item :index="resolvePath(item.path)" popper-append-to-body class="el-menu-item">
          <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
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
    >-->
    <div v-else>
      <el-menu-item
        :index="resolvePath(item.path)"
        popper-append-to-body
        class="el-menu-item"
        @click="onClick_item(item)"
      >
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
        <!-- <div v-show="showMenu2" class="menu2"> -->
        <!-- <menu2 :menu2-data="menu2Data" :root-path="item.path"></menu2> -->
        <!-- </div> -->
      </el-menu-item>
    </div>

    <!-- </li> -->
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/libs/kit/validate";
import Item from "./Item";
import AppLink from "./Link.vue";
import FixiOSBug from "./FixiOSBug";
// import menu2 from "./menu2.vue";
import { EventBus } from "../../bus/event-bus.js";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
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
      isMove: false
    };
  },
  created() {
    // console.log(this.item);
  },

  methods: {
    onClick_item($item) {
      if (this.$route.name === $item.children[0].name) return;

      if ($item.children[0].children) {
        this.$router.push({
          path: this.resolvePath(
            "." +
              path.resolve(
                $item.children[0].path,
                $item.children[0].children[0].path
              )
          )
        });
      } else {
        this.$router.push({
          path: this.resolvePath($item.children[0].path)
        });
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
      // this.$emit("enterItem", item.children);
      EventBus.$emit("enterItem", item);
      // this.menu2Data = item.children;
      // this.showMenu2 = true;
    }
  }
};
</script>

<style>
</style>
