<template>
  <div v-if="!item.hidden" @mouseenter="enter(item)">
    <template v-if="!(item.children && item.children.length > 0 )">
      <el-menu-item :index="item.name" popper-append-to-body class="el-menu-item" @click="onClick_item(item)">
        <item :icon="item.meta.icon" :title="item.meta.title" />
      </el-menu-item>
    </template>
    <div v-else>
      <el-menu-item
        :index="item.name"
        popper-append-to-body
        class="el-menu-item"
        @click="onClick_item(item)"
      >
        <item :icon="item.meta.icon" :title="item.meta.title" />
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import Item from "./Item";
import FixiOSBug from "./FixiOSBug";
// import menu2 from "./menu2.vue";
import { EventBus } from "../../bus/event-bus.js";
export default {
  name: "SidebarItem",
  components: { Item },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick_item($item) {
      if ($item.children && $item.children.length > 0) {
        const secondItem = $item.children[0];
        if (secondItem.children && secondItem.children.length > 0) {
          this.$router.push({
            name: secondItem.children[0].name
          })
        } else {
          this.$router.push({
            name: secondItem.name
          })
        }
      } else {
        this.$router.push({
          name: $item.name
        })
      }
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
      background: rgb(40, 40, 49) !important;
      color: #FFFFFF !important;
      /deep/ i {
        color: #FFFFFF !important;
      }
    }
  }
</style>
