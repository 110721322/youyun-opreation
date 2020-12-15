<template>
  <div class="page_box">
    <header>
      <img src="@/assets/img/logo.png" alt="" class="g-logo">
    </header>
    <section style="width: 100%;height: auto">
      <div class="login-box">
        <div class="left-box">
          <img src="@/assets/img/loginBg.png" alt="">
        </div>
        <div class="right-box">
          <div class="login-content">
            <div class="title">{{ title }}</div>
            <div class="input-box">
              <el-autocomplete
                  v-model="ruleForm.mobile"
                  :fetch-suggestions="queryMobile"
                  @select="handleSelect"
                  :maxlength="11"
                  ref="autocomplete"
                  class="login-input"
                  name="codePhone"
                  placeholder="请输入手机号"
                  clearable
                  size="large"
              >
                <template slot-scope="{ item }">
                  <div class="f-fz-14 flex-between flex-align-center">
                    <p>{{ $g.utils.phoneProtect(item) }}</p>
                    <el-button style="color: #909399" type="text" class="f-fz-14" icon="el-icon-circle-close" @click.stop="removePhone(item)"></el-button>
                  </div>
                </template>
              </el-autocomplete>
              <el-input
                  v-model="ruleForm.code"
                  maxlength="6"
                  type="text"
                  class="login-input"
                  name="code"
                  placeholder="请输入验证码"
                  size="large"
              >
                <template slot="append">
                <span
                    v-if="countLoginTime<=0"
                    class="verification-btn"
                    @click="onClick_sendLoginCode"
                >获取验证码</span>
                  <span v-if="countLoginTime>0" class="verification-btn">{{ countLoginTime + " s" }}</span>
                </template>
              </el-input>
            </div>
            <div class="btn-box">
              <el-button type="primary" class="login-btn" @click="onClick_codeLogin">登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div style="height: 107px;"></div>
    <footer>
      <img class="s-slogan" src="@/assets/img/system_slogan.png" alt="">
      <p>咨询热线：136-6666-8890</p>
      <p>杭州火脸科技有限公司 @Copyright 2020.All Rights Reserved.</p>
    </footer>
  </div>
</template>
<script type="text/ecmascript-6">
import api from "@/api/api_login";
import api_common from "@/api/api_common";
import {computedRoleRouter} from '@/libs/role'
import currRouter from '@/router/addRouter'
import { mapActions, mapState } from 'vuex';
import store from '@/store';
import { validPhone } from "@/libs/kit/validate";

export default {
  components: {},
  data() {
    return {
      ruleForm: {
        mobile: "",
        code: "",
        domain: window.location.origin
      },
      title: "系统登录",
      activeType: "verificationLogin",
      countLoginTime: 0,
      source: 'LOGIN'
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
    onClick_sendLoginCode() {
      const that = this;
      if (!this.ruleForm.mobile) {
        this.$message("请输入手机号");
        return;
      }
      if (!validPhone(this.ruleForm.mobile)) {
        this.$message("请输入规范11位手机号");
        return;
      }
      api_common
        .getSmsCode({
          mobile: this.ruleForm.mobile,
          source: this.source
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
      this.saveAccessToken(res.data.accessToken)
      this.saveUserInfo(res.data)
      this.addLoginHistory(res.data.mobile);
      computedRoleRouter(res.data.menuVOList)
      this.addRoutes();
      this.$nextTick(() => {
        if (this.$route.query.redirect) {
          this.$router.push({ path: `${this.$route.query.redirect}` });
        } else {
          let routerName;
          const first = res.data.menuVOList[0];
          if (first.children && first.children.length > 0) {
            const second = first.children[0];
            if (second.children && second.children.length > 0) {
              routerName = second.children[0].routerName
            } else {
              routerName = second.routerName
            }
          } else {
            routerName = first.routerName
          }
          this.$router.push({name: routerName});
        }
      })
    },
    queryMobile($queryString = this.ruleForm.mobile, $callback) {
      const loginHistory = this.loginHistory.filter(phone => phone.indexOf($queryString) > -1)
      $callback(loginHistory)
    },
    handleSelect($phone) {
      this.ruleForm.mobile = $phone;
    },
    removePhone($phone) {
      const removeIndex = this.loginHistory.findIndex((item) => item === $phone)
      this.removeHistory(removeIndex)
      this.$refs.autocomplete.getData()
    },
    addRoutes() {
      const menuItems = this.$g.utils.deepClone(store.state.role.routes);
      const routerList = currRouter.menusToRoutes(menuItems);
      this.$router.addRoutes(routerList);
      this.saveRoutersArr(routerList)
    },
    onClick_codeLogin() {
      if (!this.ruleForm.mobile) {
        this.$message("请输入手机号");
        return;
      }
      if (!validPhone(this.ruleForm.mobile)) {
        this.$message("请输入规范11位手机号");
        return;
      }
      if (!this.ruleForm.code) {
        this.$message("请输入验证码");
        return;
      }
      api
        .login(this.ruleForm)
        .then(res => this.loginCallBack(res))
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/login.scss";
.page_box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 1440px;
  background: #F8F8FC;
  overflow: auto;
  header {
    width: 100%;
    height: 66px;
    background: #FFFFFF;
    padding: 13px 45px;
    border-bottom: 1px solid #E3E3E3;
    .g-logo {
      display: block;
      width: 119px;
      height: 40px;
    }
  }
  .login-box {
    display: flex;
    width: 900px;
    height: 444px;
    margin: 94px auto;
    .left-box {
      float: left;
      width: 450px;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .right-box {
      float: left;
      display: flex;
      flex-direction: column;
      width: 450px;
      height: 100%;
      padding: 61px 45px;
      border: 1px solid #E0E0E0;
      background: #FFFFFF;
      .login-content {
        width: 100%;
        height: 100%;
        padding: 28px 42px 45px;
        .title {
          margin-bottom: 30px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #197BFA;
          text-align: center;
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
          background: rgba(25, 137, 250, 1);
          border-radius: 4px;
          font-size: 16px;
          font-weight: bolder;
          letter-spacing: 5px;
          font-family: PingFangSC-Medium, PingFang SC;
        }
      }
    }
    .input-box {
      width: 100%;
      .login-input {
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
          padding-left: 9px;
          font-size: 12px;
          color: #000;
          &::placeholder {
            color: #999;
          }
        }
      }
      .verification-btn {
        display: inline-block;
        width: 83px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        text-align: center;
        background: #1989FA;
        border-radius: 0px 4px 4px 0px;
        font-size: 12px;
        color: #FFFFFF;
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    padding-top: 19px;
    background: #282828;
    .s-slogan {
      display: block;
      width: 173px;
      height: 19px;
      margin: 0 auto;
    }
    p {
      margin-top: 10px;
      color: #C0C0C0;
      font-size: 10px;
      text-align: center;
    }
  }
}
</style>
