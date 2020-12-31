<template>
  <div class="m-login">
    <section style="width: 100%;height: auto">
      <div class="login-box">
        <div class="login-content">
          <img class="m-logo" src="@/assets/img/logo.png" alt="logo">
          <div class="title">{{ title }}</div>
          <el-tabs v-model="activeType" class="m-login-tabs">
            <el-tab-pane label="账户密码登录" name="username">
              <div class="input-box clearfix">
                <el-autocomplete
                    v-model="ruleForm.phone"
                    :fetch-suggestions="queryMobile"
                    @select="handleSelect"
                    :maxlength="11"
                    ref="autocomplete"
                    class="m-login-input"
                    name="codePhone"
                    placeholder="账户"
                    clearable
                    size="large"
                >
                  <i slot="prefix" class="el-input__icon iconfont iconuser m-icon-prefix f-fc-theme"></i>
                  <template slot-scope="{ item }">
                    <div class="f-fz-14 flex-between flex-align-center">
                      <p>{{ $g.utils.phoneProtect(item) }}</p>
                      <el-button style="color: #909399" type="text" class="f-fz-14" icon="el-icon-circle-close" @click.stop="removePhone(item)"></el-button>
                    </div>
                  </template>
                </el-autocomplete>
                <el-input
                    v-model="ruleForm.password"
                    type="password"
                    class="m-login-input"
                    name="code"
                    placeholder="密码"
                    size="large"
                >
                  <i slot="prefix" class="el-input__icon iconfont iconlock m-icon-prefix f-fc-theme"></i>
                </el-input>
                <el-button type="text" class="m-forget-psd clearfix f-fz-14" @click="showForgetPsd">忘记密码</el-button>
              </div>
              <div class="btn-box">
                <el-button type="primary" class="login-btn" @click="clickPsdLogin">登录</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="手机号登录" name="phone">
              <div class="input-box">
                <el-autocomplete
                    v-model="ruleForm.phone"
                    :fetch-suggestions="queryMobile"
                    @select="handleSelect"
                    :maxlength="11"
                    ref="autocomplete"
                    class="m-login-input"
                    name="codePhone"
                    placeholder="手机号"
                    clearable
                    size="large"
                >
                  <i slot="prefix" class="el-input__icon iconfont iconmobile m-icon-prefix f-fc-theme"></i>
                  <template slot-scope="{ item }">
                    <div class="f-fz-14 flex-between flex-align-center">
                      <p>{{ $g.utils.phoneProtect(item) }}</p>
                      <el-button style="color: #909399" type="text" class="f-fz-14" icon="el-icon-circle-close" @click.stop="removePhone(item)"></el-button>
                    </div>
                  </template>
                </el-autocomplete>
                <div class="flex-between">
                  <el-input
                      v-model="ruleForm.code"
                      maxlength="6"
                      type="text"
                      class="m-login-input s-code-input"
                      name="code"
                      placeholder="验证码"
                      size="large"
                  >
                    <i slot="prefix" class="el-input__icon iconfont iconmail m-icon-prefix f-fc-theme"></i>
                  </el-input>
                  <el-button
                      class="m-login-code-btn"
                      v-show="countLoginTime <= 0"
                      @click="clickSendLoginCode">获取验证码</el-button>
                  <el-button class="m-login-code-btn" v-show="countLoginTime > 0">{{ countLoginTime + " s" }}</el-button>
                </div>
              </div>
              <div class="btn-box">
                <el-button type="primary" class="login-btn" @click="clickCodeLogin">登录</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>
    <div style="height: 48px;"></div>
    <footer>
      <p>Copyright© 2020杭州火脸科技有限公司</p>
    </footer>
    <update-psd
        ref="forgetPsd"
        title="忘记密码"
    ></update-psd>
  </div>
</template>
<script type="text/ecmascript-6">
import api from "@/api/api_login";
import api_common from "@/api/api_common";
import {computedRoleRouter} from '@/libs/role'
import currRouter from '@/router/addRouter'
import { mapActions, mapState } from 'vuex';
import store from '@/store';
import { validPhone } from "youyun-vue-components/global/kit/validate";
import UpdatePsd from "@/components/UpdatePsd/UpdatePsd";

export default {
  components: {
    UpdatePsd
  },
  data() {
    return {
      ruleForm: {
        phone: "",
        password: "",
        code: ""
      },
      title: "火脸收银-运营后台",
      activeType: "username",
      system: 'operation',
      countLoginTime: 0
    };
  },
  computed: {
    ...mapState({
      loginHistory: (state) => state.system.loginHistory
    })
  },
  methods: {
    ...mapActions([
      'saveAccessToken', 'saveUserInfo', 'saveRoutersArr', 'addLoginHistory', 'removeHistory'
    ]),
    clickSendLoginCode() {
      const that = this;
      if (!this.ruleForm.phone) {
        this.$message("请输入手机号");
        return;
      } else if (!validPhone(this.ruleForm.phone)) {
        this.$message("请输入规范11位手机号");
        return;
      }
      api_common
        .getSmsCode({
          phone: this.ruleForm.phone,
          system: this.system
        })
        .then(res => {
          this.countLoginTime = 60;
          const interval = setInterval(() => {
            if (that.countLoginTime > 0) {
              that.countLoginTime--;
            } else {
              clearInterval(interval);
            }
          }, 1000);
          this.$message({
            type: "success",
            message: "已发送"
          });
        })
        .catch((e) => {
          this.countLoginTime = 0;
        });
    },
    /**
     * 登录成功回调
     * @param res
     */
    loginCallBack(res) {
      const { accessToken, user } = res.data;
      const { id, roleId } = user;
      this.saveAccessToken(accessToken)
      this.saveUserInfo(user)
      this.addLoginHistory(user.phone);
      this.queryUserVueRouterList(id, roleId);
    },
    queryMobile($queryString = this.ruleForm.phone, $callback) {
      const loginHistory = this.loginHistory.filter(phone => phone.indexOf($queryString) > -1)
      $callback(loginHistory)
    },
    handleSelect($phone) {
      this.ruleForm.phone = $phone;
    },
    removePhone($phone) {
      const removeIndex = this.loginHistory.findIndex((item) => item === $phone)
      this.removeHistory(removeIndex)
      this.$refs.autocomplete.getData()
    },
    queryUserVueRouterList($userId, $roleId) {
      const params = {
        system: this.system,
        userId: $userId,
        roleId: $roleId
      };
      api.queryUserVueRouterList(params).then(res => {
        computedRoleRouter(res.data)
        this.addRoutes();
        this.$nextTick(() => {
          let routerName;
          const first = res.data[0];
          if (first.children && first.children.length > 0) {
            const second = first.children[0];
            if (second.children && second.children.length > 0) {
              routerName = second.children[0].name
            } else {
              routerName = second.name
            }
          } else {
            routerName = first.name
          }
          this.$router.push({name: routerName}).catch(() =>{})
        })
      })
    },
    addRoutes() {
      const menuItems = this.$g.utils.deepClone(store.state.role.routes);
      const routerList = currRouter.menusToRoutes(menuItems);
      this.$router.addRoutes(routerList);
      this.saveRoutersArr(routerList)
    },

    clickCodeLogin() {
      if (!this.ruleForm.phone) {
        this.$message("请输入手机号");
        return;
      } else if (!validPhone(this.ruleForm.phone)) {
        this.$message("请输入规范11位手机号");
        return;
      } else if (!this.ruleForm.code) {
        this.$message("请输入验证码");
        return;
      }
      const params = {
        phone: this.ruleForm.phone,
        code: this.ruleForm.code,
        type: 'message',
        system: this.system
      }
      api
        .login(params)
        .then(res => this.loginCallBack(res))
    },
    clickPsdLogin() {
      if (!this.ruleForm.phone) {
        this.$message("请输入手机号");
        return;
      } else if (!validPhone(this.ruleForm.phone)) {
        this.$message("请输入规范11位手机号");
        return;
      } else if (!this.ruleForm.password) {
        this.$message("请输入密码")
        return;
      }
      const params = {
        phone: this.ruleForm.phone,
        password: this.ruleForm.password,
        type: 'password',
        system: this.system
      }
      api.login(params).then(res => {
        this.loginCallBack(res)
      })
    },
    showForgetPsd() {
      this.$refs.forgetPsd.showUpdatePsd();
    }
  }
};
</script>
<style lang="scss" scoped>
.m-login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 1440px;
  background: #F0F3F7;
  overflow: auto;
  .login-box {
    display: flex;
    width: 368px;
    margin: 110px auto;
    .login-content {
      width: 100%;
      height: 100%;
      .m-logo {
        display: block;
        width: 90px;
        height: 40px;
        margin: 0 auto 12px;
      }
      .title {
        margin-bottom: 30px;
        font-size: 33px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        text-align: center;
      }
      .m-login-tabs {
        /deep/ .el-tabs__header {
          margin-bottom: 24px;
          /deep/ .el-tabs__nav-wrap {
            &::after{
              height: 0;
            }
          }
        }
      }
    }
    .btn-box {
      width: 100%;
      height: 40px;
      .login-btn {
        padding: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-radius: 2px;
        font-size: 16px;
        letter-spacing: 5px;
        font-family: PingFangSC-Medium, PingFang SC;
      }
    }
    .input-box {
      width: 100%;
      .m-login-input {
        width: 100%;
        height: 40px;
        margin-bottom: 24px;
        /deep/ .el-input-group__append {
          height: 33px;
          padding: 0;
          border: 0;
        }
        /deep/ .el-input__inner {
          height: 40px;
          padding-left: 36px;
          font-size: 16px;
          color: #000;
          border-radius: 2px;
          &::placeholder {
            color: #C0C4CC;
          }
        }
        &.s-code-input {
          width: 258px;
        }
      }
      .m-login-code-btn {
        display: block;
        height: 40px;
        width: 102px;
        border-radius: 0;
      }
      .m-icon-prefix {
        padding-left: 10px;
      }
    }
    .m-forget-psd {
      float: right;
      padding: 0;
      margin-bottom: 24px;
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 48px;
    p {
      margin-top: 10px;
      color: #C0C0C0;
      font-size: 10px;
      text-align: center;
    }
  }
}
</style>
