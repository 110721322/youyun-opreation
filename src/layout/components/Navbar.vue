<template>
  <div class="navbar">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :src="avatar" size="small" style="margin-right: 12px;"></el-avatar>
          <span class="name">{{ nameLabel }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_login";
import Breadcrumb from "./breadcrumb.vue";
import { mapActions } from 'vuex';
import avatar from "@/assets/img/icon_avatar.png";
export default {
  components: {
    // Hamburger,
    Breadcrumb
  },
  data() {
    return {
      avatar: avatar,
      userInfo: this.$store.state.admin.userInfo
    }
  },
  computed: {
    nameLabel() {
      if (this.$g.utils.isObj(this.userInfo)) {
        return this.userInfo.userName || '用户名'
      } else {
        return ""
      }
    }
  },
  methods: {
    ...mapActions(['resetState']),
    async logout() {
      api
        .out({
          userToken: this.$store.state.admin.accessToken
        })
        .then(res => {
          const roleId = this.$store.state.admin.userInfo.roleId;
          this.resetState();
          console.log(roleId);
          if (roleId === 2) {
            this.$router.replace(`/LoginStore`);
          } else {
            this.$router.replace(`/Login`);
          }
        })
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
    margin-left: 32px;
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
      font-size: 14px;
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
        display: flex;
        align-items: center;
        margin-top: 5px;
        position: relative;
        margin-right: 20px;
        .name {
          height: 40px;
          line-height: 40px;
          margin-top: 0;
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
