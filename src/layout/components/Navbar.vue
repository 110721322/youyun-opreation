<template>
  <div class="navbar">
    <!-- <hamburger
      id="hamburger-container"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />-->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template>
        <search id="header-search" class="right-menu-item" />
        <img src="@/assets/img/ding.png" class="search_img" @click.stop="click" />

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" />-->
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://avatars1.githubusercontent.com/u/23054546?s=64&v=4" class="user-avatar" />
          <span class="name">伯温</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_login";
// import Hamburger from './Head/index.vue'
import Breadcrumb from "./breadcrumb.vue";
// import Screenfull from "./Screenfull/index.vue";
import { EventBus } from "../bus/event-bus.js";
import Search from "./headSearch.vue";
export default {
  components: {
    // Hamburger,
    Breadcrumb,
    Search
  },
  computed: {},
  methods: {
    toggleSideBar() {
      const openSlider = localStorage.getItem("openSlider");
      // eslint-disable-next-line eqeqeq
      localStorage.setItem("openSlider", openSlider == 1 ? 2 : 1);
      EventBus.$emit("decreased", {});
    },
    async logout() {
      // await this.$store.dispatch("user/logout");
      api
        .out({
          userToken: localStorage.getItem("token-merchant")
        })
        .then(res => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
        .catch(err => {
          this.$message(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background-color 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .search_img {
      margin: 15px 15px 0 0;
      width: 22px;
      float: left;
    }
    .right-menu-item {
      // display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      float: left;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        margin-right: 20px;
        .name {
          width: 40px;
          height: 40px;
          display: inline-block;
          line-height: 40px;
          margin-top: 0;
          position: absolute;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 14px;
        }
      }
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
