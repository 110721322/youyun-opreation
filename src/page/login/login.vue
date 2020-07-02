<template>
  <div class="page_box">
    <div class="login-box">
      <div class="left-box">
        <div class="logo">
          <img src="../../assets/img/loginLogo.png" alt class="logo-img" />
        </div>
        <div class="title">智慧办公系统</div>
        <div class="login-content">
          <template v-if="activeType==='accountLogin'">
            <div class="type-box">
              <span class="active-type" @click="toAccountLogin">账号密码登录</span>
              <span class="unactive-type ml" @click="toVerificationLogin">验证码登录</span>
            </div>
            <div class="input-box">
              <el-input
                v-model="ruleForm.phone"
                class="login-input"
                placeholder="请输入手机号"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
              <el-input
                v-model="ruleForm.password"
                type="password"
                class="login-input"
                placeholder="请输入密码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
            <div class="forget-box" @click="toChangePasswd">忘记密码</div>
            <div class="btn-box">
              <el-button type="primary" class="login-btn" @click="onClick_passwdLogin">登录</el-button>
            </div>
          </template>
          <template v-if="activeType==='verificationLogin'">
            <div class="type-box">
              <span class="unactive-type" @click="toAccountLogin">账号密码登录</span>
              <span class="active-type ml" @click="toVerificationLogin">验证码登录</span>
            </div>
            <div class="input-box">
              <el-input
                v-model="ruleForm2.phone"
                class="login-input"
                placeholder="请输入手机号"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
              <el-input
                v-model="ruleForm2.verification"
                type="password"
                class="login-input"
                placeholder="请输入验证码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
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
            <div class="forget-box" @click="toChangePasswd">忘记密码</div>
            <div class="btn-box">
              <el-button type="primary" class="login-btn" @click="onClick_codeLogin">登录</el-button>
            </div>
          </template>
          <template v-if="activeType==='changePasswd'">
            <div class="type-box">
              <span class="active-type">修改密码</span>
            </div>
            <div class="input-box">
              <el-input
                v-model="ruleForm3.phone"
                class="login-input"
                placeholder="请输入手机号"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
              <el-input
                v-model="ruleForm3.verification"
                type="password"
                class="login-input"
                placeholder="请输入验证码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                <template slot="append">
                  <span
                    v-if="countChangeTime<=0"
                    class="verification-btn"
                    @click="onClick_sendChangeCode"
                  >获取验证码</span>
                  <span
                    v-if="countChangeTime>0"
                    class="verification-btn"
                  >{{ countChangeTime + " s" }}</span>
                </template>
              </el-input>
            </div>
            <div class="btn-box">
              <el-button type="primary" class="login-btn" @click="setNewPasswd">下一步</el-button>
            </div>
          </template>
          <template v-if="activeType==='setNewPasswd'">
            <div class="type-box">
              <span class="active-type">修改密码</span>
            </div>
            <div class="input-box">
              <el-input
                v-model="ruleForm4.newPasswd"
                class="login-input"
                placeholder="请输入新密码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
              <el-input
                v-model="ruleForm4.newPasswdAgain"
                type="password"
                class="login-input"
                placeholder="再次输入新密码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
            <div class="btn-box">
              <el-button type="primary" class="login-btn" @click="onClick_changePassword">确定</el-button>
            </div>
          </template>
          <template v-if="activeType==='wxScan'">
            <div class="content-title">请微信扫码后，填写信息</div>
            <div class="content-img">
              <img src alt class="qrcode" />
            </div>
            <div class="content-box--btn">
              <el-button type="primary" class="content-btn">已完善</el-button>
            </div>
          </template>
          <template v-if="activeType==='contactSuper'">
            <div class="content-title">请联系主管补充资料</div>
            <div class="content-img">
              <img src="../../assets/img/superBg.png" alt class="contact-img" />
            </div>
            <div class="content-box--btn">
              <el-button type="primary" class="content-btn">已补充</el-button>
            </div>
          </template>
          <div class="bottom-box">没有账号？<span @click="onClick_register">立即注册</span></div>
        </div>
        <div v-show="false" class="regist-content">
          <template>
            <div class="regist-title">服务商账户注册</div>
            <div class="input-box">
              <el-input
                v-model="ruleForm.phone"
                class="login-input"
                placeholder="请输入手机号"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
              <el-input
                v-model="ruleForm.password"
                type="password"
                class="login-input"
                placeholder="请输入验证码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                <template slot="append">
                  <span
                    v-if="countLoginTime<=0"
                    class="verification-btn"
                    @click="onClick_sendLoginCode"
                  >获取验证码</span>
                </template>
              </el-input>
              <el-input
                v-model="ruleForm.password"
                type="password"
                class="login-input"
                placeholder="请输入新密码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
              <el-input
                v-model="ruleForm.password"
                type="password"
                class="login-input"
                placeholder="再次确认新密码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
            <div class="btn-box">
              <el-button type="primary" class="login-btn" @click="onClick_newregist">立即注册</el-button>
            </div>
            <div class="bottom-box">已有账号？<span @click="onClick_changelogin">立即登录</span></div>
          </template>
        </div>
        <div class="check-box">
          <template>
            <div class="regist-title">服务商账户注册</div>
            <div class="input-box">
              <template>
                <el-radio v-model="radio" label="1">企业商户</el-radio>
                <el-radio v-model="radio" label="2">个人商户</el-radio>
              </template>
              <el-input
                v-model="ruleForm.phone"
                class="login-input"
                placeholder="请输入公司名称"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
              <el-input
                v-model="ruleForm.password"
                type="password"
                class="login-input"
                placeholder="请输入法人姓名"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
              <el-input
                v-model="ruleForm.password"
                type="password"
                class="login-input"
                placeholder="请输入法人手机号"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
              <el-input
                v-model="ruleForm.password"
                type="password"
                class="login-input"
                placeholder="请输入邮箱"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
              <el-cascader
                v-model="county"
                class="login-input"
                :options="options"
                placeholder="省/市/区"
                @change="changeCounty"
              ></el-cascader>
              <el-input
                v-model="ruleForm.password"
                type="password"
                class="login-input"
                placeholder="请输入详细地址"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
            <div class="btn-regist">立即注册</div>
          </template>
        </div>
      </div>
      <div class="right-box">
        <img src="../../assets/img/loginBg.png" alt class="right-img" />
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import api from "@/api/api_login";
import { mapActions } from 'vuex';
// import * as g from '@/libs/global';

export default {
  components: {},
  data() {
    return {
      radio: '1',
      county: '',
      options: [],
      isRegister: false,
      isLogin: true,
      loading: false,
      ruleForm: {
        phone: "",
        password: ""
      },
      ruleForm2: {
        phone: "",
        verification: ""
      },
      ruleForm3: {
        phone: "",
        verification: ""
      },
      ruleForm4: {
        newPasswd: "",
        newPasswdAgain: ""
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      activeType: "accountLogin",
      countLoginTime: 0,
      countChangeTime: 0
    };
  },
  watch: {},
  created() {},
  methods: {
    ...mapActions([
      'saveUserInfo', 'setRolePermission'
    ]),
    changeCounty() {},
    onClick_changePassword() {
      if (!this.ruleForm4.newPasswd) {
        this.$alert("请输入新密码");
        return;
      }
      if (!this.ruleForm4.newPasswdAgain) {
        this.$alert("请再次输入新密码");
        return;
      }
      if (this.ruleForm4.newPasswd.length < 6) {
        this.$alert("密码长度不能小于6位");
        return;
      }
      if (this.ruleForm4.newPasswd !== this.ruleForm4.newPasswdagain) {
        this.$alert("两次密码输入不一致");
        return;
      }
      api
        .changePassword({
          newPassword: this.ruleForm4.newPasswd,
          confirmPassword: this.ruleForm4.newPasswdAgain
        })
        .then(res => {
          this.toAccountLogin();
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    onClick_sendLoginCode() {
      if (!this.ruleForm2.phone) {
        this.$alert("请输入手机号");
        return;
      }
      this.countLoginTime = 60;
      const interval = setInterval(() => {
        if (this.countLoginTime > 0) {
          this.countLoginTime--;
        } else {
          clearInterval(interval);
        }
      }, 1000);

      api
        .getSmsCode({
          userName: this.ruleForm2.phone
        })
        .then(res => {
          this.$message("已发送");
        })
        .catch(err => {
          this.countLoginTime = 0;
          clearInterval(interval);
          this.$message(err);
        });
    },
    onClick_sendChangeCode() {
      if (!this.ruleForm3.phone) {
        this.$alert("请输入手机号");
        return;
      }
      this.countChangeTime = 60;
      const interval = setInterval(() => {
        if (this.countChangeTime > 0) {
          this.countChangeTime--;
        } else {
          clearInterval(interval);
        }
      }, 1000);

      api
        .getSmsCode({
          userName: this.ruleForm3.phone
        })
        .then(res => {
          this.$message("已发送");
        })
        .catch(err => {
          this.countChangeTime = 0;
          clearInterval(interval);
          this.$message(err);
        });
    },
    setNewPasswd() {
      if (!this.ruleForm3.phone) {
        this.$alert("请输入手机号");
        return;
      }
      if (!this.ruleForm3.verification) {
        this.$alert("请输入验证码");
        return;
      }
      api
        .forgetPassword({
          loginType: 1,
          code: this.ruleForm3.verification,
          id: 40290,
          userName: this.ruleForm3.phone
        })
        .then(res => {
          this.toSetNewPasswd();
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    toSetNewPasswd() {
      this.activeType = "setNewPasswd";
    },
    toChangePasswd() {
      this.activeType = "changePasswd";
    },
    toAccountLogin() {
      this.activeType = "accountLogin";
    },
    toVerificationLogin() {
      this.activeType = "verificationLogin";
    },
    onClick_passwdLogin() {
      if (!this.ruleForm.phone) {
        this.$alert("请输入账号");
        return;
      }
      if (!this.ruleForm.password) {
        this.$alert("请输入密码");
        return;
      }
      api
        .login({
          phone: this.ruleForm.phone,
          password: this.ruleForm.password,
          type: 'password',
          system: 'operation'

        })
        .then(res => {
          localStorage.setItem('accessToken', res.object.accessToken)

          this.saveUserInfo(res.object.user)
          this.setRolePermission(['merchant'])
          if (this.$route.query.redirect) {
            this.$router.push({ path: `${this.$route.query.redirect}` });
          } else {
            this.$router.push(`/index`);
          }
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    onClick_codeLogin() {
      if (!this.ruleForm2.phone) {
        this.$alert("请输入手机号");
        return;
      }
      if (!this.ruleForm2.verification) {
        this.$alert("请输入验证码");
        return;
      }
      api
        .login({
          loginType: 2,
          code: this.ruleForm2.verification,
          id: 40290,
          userName: this.ruleForm2.phone
        })
        .then(res => {
          if (this.$route.query.redirect) {
            this.$router.push({ path: `${this.$route.query.redirect}` });
          } else {
            this.$router.push(`/index`);
          }
        })
        .catch(err => {
          this.$alert(err);
        });
    },
    onClick_register() {
      this.isRegister = true
      this.isLogin = false
    },
    onClick_newregist() {},
    onClick_changelogin() {
      this.isRegister = false
      this.isLogin = true
    }
    // onClick_login(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.loading = true;
    //       api
    //         .login({
    //           loginAccount: this.ruleForm.account,
    //           loginPassword: this.ruleForm.password
    //         })
    //         .then(result => {
    //           this.loading = false;
    //           window.localStorage.setItem(
    //             "token-merchant",
    //             result.object.userToken
    //           );
    //           let merchantUser = JSON.stringify(result.object.merchantUser);
    //           window.localStorage.setItem("userInfo-merchant", merchantUser);

    //           g.fun.getMenuList(() => {
    //             this.$router.replace({
    //               path: g.menuModel.list[0].url,
    //               query: {
    //                 roleType:
    //                   g.menuModel.list[0].menuName.indexOf("-") !== -1
    //                     ? g.menuModel.list[0].menuName.substring(
    //                         g.menuModel.list[0].menuName.length - 1,
    //                         g.menuModel.list[0].menuName.length
    //                       )
    //                     : ""
    //               }
    //             });
    //           });
    //         })
    //         .catch(() => {
    //           this.loading = false;
    //           this.ruleForm = {
    //             account: "",
    //             password: ""
    //           };
    //         });
    //     } else {
    //       return false;
    //     }
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/login.scss";
.page_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f3f7;
}
.login-box {
  display: flex;
  width: 100%;
  height: 100%;
  .left-box {
    display: flex;
    flex-direction: column;
    width: 40%;
    padding-left: 7.3%;
    background: #f0f3f7;
    .logo {
      width: 100px;
      height: 50px;
      margin-top: 30px;
      .logo-img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      margin-top: 101px;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(25, 137, 250, 1);
      line-height: 30px;
      letter-spacing: 1px;
    }
    .login-content,.regist-content,.check-box {
      margin-top: 73px;
    }
    .regist-content {
      width: 100%;
      .regist-title {
        font-size: 20px;
        font-weight: 500;
      }
    }
    .type-box {
      .active-type {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
      }
      .unactive-type {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(191, 191, 191, 1);
        line-height: 18px;
      }
      .ml {
        margin-left: 26px;
      }
    }
    .forget-box {
      margin-top: 16px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(191, 191, 191, 1);
      line-height: 18px;
    }
    .btn-box {
      margin-top: 16px;
      width: 368px;
      margin-bottom: 16px;
      .login-btn {
        width: 100%;
        line-height: 20px;
        background: rgba(25, 137, 250, 1);
        border-radius: 4px;
        font-size: 16px;
        letter-spacing: 5px;
      }
    }
    .bottom-box {
      width: 368px;
      text-align: center;
      font-size: 16px;
      color: #606266;
      span {
        color: #1989FA;
        cursor: pointer;
      }
    }
    .content-title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      text-align: center;
    }
    .content-img {
      margin-top: 32px;
      text-align: center;
      .qrcode {
        display: inline-block;
        width: 178px;
        height: 178px;
        background: #aaa;
      }
      .contact-img {
        display: inline-block;
        width: 217px;
        height: 166px;
      }
    }
    .content-box--btn {
      margin-top: 32px;
      text-align: center;
      .content-btn {
        width: 180px;
        line-height: 20px;
      }
    }
  }
  .right-box {
    width: 60%;
    .right-img {
      width: 100%;
      height: 100%;
    }
  }
  .input-box {
    margin-top: 15px;
    width: 368px;
    .login-input {
      margin-top: 24px;
      /deep/ .el-input-group__append {
        padding: 0;
      }
    }
    .verification-btn {
      display: inline-block;
      width: 96px;
      line-height: 38px;
      text-align: center;
      background: rgba(25, 137, 250, 0.1);
      border-radius: 0px 4px 4px 0px;
      border: 0px solid rgba(25, 137, 250, 1);
      font-size: 16px;
      color: #333333;
    }
  }
}
.regist-suffix {
  width: 96px;
  height: 40px;
  line-height: 40px;
  background: #E8F3FE;
  color: #333333;
  border: 1px solid #1989FA;
}
.btn-regist {
  width: 368px;
  margin-top: 24px;
  background: #1989fa;
  color: #ffffff;
  border-radius: 4px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
</style>
