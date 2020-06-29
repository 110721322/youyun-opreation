<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :default-openeds="[subMenuName]">
      <div v-for="(item, key) of menu2Data" :key="key">
        <el-submenu v-if="item.children" :index="item.name">
          <template slot="title">
            <span>{{ item.text }}</span>
          </template>
          <div v-for="(childItem, childKey) of item.children" :key="childKey">
            <app-link :to="'/' + rootPath + '/' + item.path+'/'+childItem.path">
              <el-menu-item
                v-if="childItem.isShow"
                :style="currRouter==childItem.name?'color:#409EFF':''"
                :index="childItem.name"
                @click="onClick_item"
              >{{ childItem.text }}</el-menu-item>
            </app-link>
          </div>
        </el-submenu>

        <app-link :to="'/' + rootPath + '/' + item.path">
          <el-menu-item
            v-if="!item.children && item.isShow"
            :index="item.name"
            :style="currRouter==item.name?'color:#409EFF':''"
            @click="onClick_item"
          >
            <span slot="title">{{ item.text }}</span>
          </el-menu-item>
        </app-link>
      </div>
    </el-menu>
  </div>
</template>

<script>
import AppLink from "./Link";
// import { EventBus } from "../../bus/event-bus.js";

export default {
  name: "Sidebar2",
  components: { AppLink },
  props: {
    menu2Data: Array,
    rootPath: String
  },
  data() {
    return {
      currRouter: "",
      subMenuName: ""
    };
  },
  $route(to, from) {
    console.log("111");
    if (this.$route.meta.fatherName) {
      this.currRouter = this.$route.meta.fatherName;
    } else {
      this.currRouter = this.$route.name;
    }
    this.subMenuName = this.$route.meta.subMenuName;
  },
  watch: {
    $route: function() {
      if (this.$route.meta.fatherName) {
        this.currRouter = this.$route.meta.fatherName;
      } else {
        this.currRouter = this.$route.name;
      }
      this.subMenuName = this.$route.meta.subMenuName;
    },
    menu2Data: function() {
      if (this.$route.meta.fatherName) {
        this.currRouter = this.$route.meta.fatherName;
      } else {
        this.currRouter = this.$route.name;
      }
      this.subMenuName = this.$route.meta.subMenuName;
    }
  },
  created() {
    if (this.$route.meta.fatherName) {
      this.currRouter = this.$route.meta.fatherName;
    } else {
      this.currRouter = this.$route.name;
    }
    this.subMenuName = this.$route.meta.subMenuName;
  },
  methods: {
    onClick_item() {},
    setColor() {
      return "color:red";
    }
  }
};
</script>
