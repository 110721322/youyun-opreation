<template>
  <div class="page_box">
    <header>
      <img src="@/assets/img/logo.png" alt="" class="g-logo">
    </header>
    <div class="login-box">
      <div class="left-box">
        <img src="@/assets/img/loginBg.png" alt="">
      </div>
      <div class="right-box">
        <div class="login-content">
          <div class="title">平台注册</div>
          <div class="u-form-item">
            <p class="u-form-item-label">注册类型:</p>
            <el-radio v-for="(item, index) in registerType" :key="index" v-model="ruleForm.roleId" :label="item.value">{{ item.label }}</el-radio>
          </div>
          <div class="input-box">
            <el-input
                v-model="ruleForm.userName"
                maxlength="11"
                class="login-input"
                name="codePhone"
                placeholder="请输入账户名称"
                size="large"
            >
            </el-input>
            <el-input
              v-model="ruleForm.mobile"
              maxlength="11"
              class="login-input"
              name="codePhone"
              placeholder="请输入手机号"
              size="large"
            >
            </el-input>
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
                  @click="onClick_sendRegisterCode"
                >获取验证码</span>
                <span v-if="countLoginTime>0" class="verification-btn">{{ countLoginTime + " s" }}</span>
              </template>
            </el-input>
          </div>
          <div class="btn-box">
            <el-button type="primary" class="login-btn" @click="onClick_codeLogin">注册</el-button>
          </div>
          <p style="font-size: 12px;text-align: center; color: #1989FA;cursor: pointer;" @click="navigateToLogin">使用已有账户登录</p>
        </div>
      </div>
    </div>
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
import { validPhone } from "@/libs/kit/validate";

export default {
  components: {},
  data() {
    return {
      ruleForm: {
        userName: "",
        mobile: "",
        code: "",
        roleId: 3,
        managerNo: this.$route.query.managerNo
      },
      registerType: [
        {
          label: '供应商',
          value: 3
        },
        {
          label: "商户",
          value: 2
        }
      ],
      activeType: "verificationLogin",
      countLoginTime: 0
    };
  },
  created() {},
  methods: {
    onClick_sendRegisterCode() {
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
          source: "REGISTER"
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
        .catch(() => {
          this.countLoginTime = 0;
        });
    },
    /**
     * 注册成功回调
     * @param res
     */
    registerCallBack(res) {
      this.$message({
        type: "success",
        message: "注册成功,前往登陆",
        duration: 2000
      })
      this.navigateToLogin();
    },
    navigateToLogin() {
      this.$router.push({path: "/Login"})
    },
    onClick_codeLogin() {
      if (!this.ruleForm.userName) {
        this.$message("请输入账户名");
        return;
      }
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
        .register(this.ruleForm)
        .then(res => this.registerCallBack(res))
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/login.scss";
.page_box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 1440px;
  overflow: auto;
  background: #F8F8FC;
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
    margin: 96px auto;
    .left-box {
      width: 450px;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .right-box {
      display: flex;
      flex-direction: column;
      width: 450px;
      height: 100%;
      padding: 45px 45px;
      border: 1px solid #E0E0E0;
      background: #FFFFFF;
      .login-content {
        width: 100%;
        height: 100%;
        padding: 0 42px 45px;
        .title {
          margin-bottom: 30px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #197BFA;
          text-align: center;
        }
        .u-form-item {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
          .u-form-item-label {
            font-size: 12px;
            margin-right: 16px;
          }
          .el-radio {
            display: flex;
            align-items: center;
            /deep/ .el-radio__label{
              font-size: 12px;
              color: #606266;
            }
          }
        }
      }
      .btn-box {
        width: 100%;
        height: 40px;
        margin-bottom: 12px;
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
        margin-bottom: 24px;
        height: 40px;
        /deep/ .el-input-group__append {
          height: 33px;
          padding: 0;
          border: 0;
        }
        /deep/ .el-input__inner {
          height: 100%;
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
    height: 107px;
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
