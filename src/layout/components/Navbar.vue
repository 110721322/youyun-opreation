<template>
  <div class="navbar">
    <!-- <hamburger
      id="hamburger-container"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />-->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
<!--      <template>-->
<!--        <el-popover-->
<!--          placement="bottom-end"-->
<!--          popper-class="popperNav"-->
<!--          trigger="hover"-->
<!--        >-->
<!--          <div class="sysMask">-->
<!--            <div class="sysMask-title">-->
<!--              <span>待办事项</span>-->
<!--              <span>{{ todoTask.todoCount }}个待办事项</span>-->
<!--            </div>-->
<!--            <ul>-->
<!--              <li @click="toSyswarn" v-for="(item, index) in todoTask.todos" :key="index">-->
<!--                <div class="sysMask-info">-->
<!--                  <div>{{ item.taskValue }}</div>-->
<!--                  <div>{{ item.count }}</div>-->
<!--                </div>-->
<!--              </li>-->
<!--            </ul>-->
<!--            <el-button type="text" class="sysBtn" @click="toSyswarn">更多待办事项 ></el-button>-->
<!--          </div>-->
<!--          <el-badge :value="todoTask.todoCount" :max="99" slot="reference" class="badge-item">-->
<!--            <img src="@/assets/img/ding.png" class="search_img" @click="toSyswarn" />-->
<!--          </el-badge>-->
<!--        </el-popover>-->
<!--      </template>-->

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://avatars1.githubusercontent.com/u/23054546?s=64&v=4" class="user-avatar" />
          <span class="name">{{ nameLabel }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
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
import { mapActions } from 'vuex';
export default {
  components: {
    // Hamburger,
    Breadcrumb
  },
  data() {
    return {
      userInfo: this.$store.state.admin.userInfo
    }
  },
  created() {
    this.setTodoList();
  },
  computed: {
    nameLabel() {
      return this.userInfo.name || this.userInfo.jobName || this.userInfo.nickName || '无名氏'
    },
    todoTask: function() {
      return this.$store.state.admin.todoList;
    }
  },
  methods: {
    ...mapActions(['resetState', 'setTodoList']),
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
          userToken: this.$store.state.admin.accessToken
        })
        .then(res => {
          this.resetState();
          this.$router.replace(`/login`);
        })
    },
    toSyswarn() {
      if (this.$route.path === '/work/todo') {
        this.$message.warning('您已在当前页');
        return;
      }
      this.$router.push({
        path: '/work/todo'
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
    display: flex;
    align-items: center;
    justify-content: center;

    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .search_img {
      width: 22px;

      cursor: pointer;
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
      width: 153px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        margin-right: 20px;
        .name {
          width: 100px;
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
  .badge-item {
    display: inline-block;
    width: 30px;
    height: 22px;
    margin-right: 30px;
    img {
      margin-bottom: 10px;
    }
  }
}
.sysMask {
  overflow: hidden;
  overflow-y: scroll;

  width: 282px;
  height: 420px;
  padding: 20px 20px;
}
.sysMask-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 20px;
}
.sysMask-title span:nth-child(2) {
  opacity: 0.85;
}
.sysMask-info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
  opacity: 0.85;
  margin-bottom: 4px;
}
.sysMask ul {
  border-bottom: 1px solid #ffffff;
  opacity: 0.85;
}
.sysMask ul li {
  margin-bottom: 16px;

  cursor: pointer;
}
.sysMask ul li span {
  color: #ffffff;
  font-size: 12px;
  opacity: 0.4;
  line-height: 17px;
}
.sysBtn {
  margin-top: 16px;

  font-size: 14px;
  cursor: pointer;
}
</style>
