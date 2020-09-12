<template>
  <div class="page_box">
    <div class="login-box">
      <div class="left-box">
        <div class="logo">
          <img src="../../assets/img/loginLogo.png" alt class="logo-img" />
        </div>
        <div class="title">智慧办公系统</div>
        <div v-if="isLogin" class="login-content">
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
            <div class="forget-box" style="cursor: pointer;" @click="toChangePasswd">忘记密码</div>
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
                name="codePhone"
                placeholder="请输入手机号"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
              <el-input
                v-model="ruleForm2.verification"
                type="text"
                class="login-input"
                name="code"
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
          <template v-if="activeType==='changePasswdOneStep'">
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
                v-model="ruleForm3.code"
                type="text"
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
              <el-button type="primary" class="login-btn" @click="onClick_changePasswordOneStep">下一步</el-button>
            </div>
            <div class="bottom-box">已有账号？<span @click="toAccountLogin">立即登录</span></div>
          </template>
          <template v-if="activeType==='changePasswdTwoStep'">
            <div class="type-box">
              <span class="active-type">修改密码</span>
            </div>
            <div class="input-box">
              <el-input
                v-model="ruleForm3.password"
                type="password"
                class="login-input"
                placeholder="请输入新密码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
              <el-input
                v-model="ruleForm3.passwordSecond"
                type="password"
                class="login-input"
                placeholder="再次输入新密码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
            <div class="btn-box">
              <el-button type="primary" class="login-btn" @click="onClick_changePasswordTwoStep">确定</el-button>
            </div>
            <div class="bottom-box">已有账号？<span @click="toAccountLogin">立即登录</span></div>
          </template>
          <div class="bottom-box">没有账号？<span @click="onClick_changeregister">立即注册</span></div>
        </div>
        <div v-else class="regist-content">
          <template>
            <div class="regist-title">服务商账户注册</div>
            <div class="input-box">
              <template>
                <el-radio v-model="registerForm.businessType" label="enterprise">企业商户</el-radio>
                <el-radio v-model="registerForm.businessType" label="individual">个人商户</el-radio>
              </template>
              <el-input
                v-model="registerForm.company"
                class="login-input"
                type="text"
                placeholder="请输入公司名称"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-office-building"></i>
              </el-input>
              <el-input
                v-model="registerForm.personName"
                type="text"
                class="login-input"
                placeholder="请输入法人姓名"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
              <el-input
                v-model="registerForm.personMobile"
                type="text"
                class="login-input"
                placeholder="请输入法人手机号"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-phone"></i>
              </el-input>
              <el-input
                v-model="registerForm.phone"
                type="text"
                class="login-input"
                placeholder="请输入登录手机号"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-phone"></i>
              </el-input>
              <el-input
                v-model="registerForm.password"
                autocomplete="off"
                type="password"
                class="login-input"
                placeholder="请输入密码"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
              <el-input
                v-model="registerForm.email"
                type="text"
                class="login-input"
                placeholder="请输入邮箱"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-message"></i>
              </el-input>
              <el-cascader
                v-model="county"
                class="login-input"
                :options="options"
                placeholder="省/市/区"
                @change="changeCounty"
              ></el-cascader>
              <el-input
                v-model="registerForm.address"
                type="text"
                class="login-input"
                placeholder="请输入详细地址"
                size="large"
              >
                <i slot="prefix" class="el-input__icon el-icon-location-information"></i>
              </el-input>
            </div>
            <div class="btn-regist" @click="onClick_register">立即注册</div>
          </template>
          <div class="bottom-box">已有账号？<span @click="onClick_changelogin">立即登录</span></div>
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
import {computedRoleRouter} from '@/libs/role'
import currRouter from '@/router/addRouter'
import { mapActions } from 'vuex';
import store from '@/store';
import areaData from "@/assets/data/areaData";

export default {
  components: {},
  data() {
    return {
      radio: '1',
      county: '',
      options: areaData,
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
        system: 'operation',
        phone: "",
        code: "",
        password: "",
        passwordSecond: ""
      },
      registerForm: {
        businessType: null,
        company: '',
        personName: '',
        personMobile: '',
        email: '',
        address: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        phone: '',
        password: ''
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
      'saveAccessToken', 'saveUserInfo', 'saveRoutersArr', 'saveWebsocketOption'
    ]),
    changeCounty($codes) {
      this.registerForm['provinceCode'] = $codes[0];
      this.registerForm['cityCode'] = $codes[1];
      this.registerForm['areaCode'] = $codes[2];
    },
    onClick_changePasswordOneStep() {
      if (!this.ruleForm3.code) {
        this.$alert("请输入验证码");
        return;
      }
      this.activeType = "changePasswdTwoStep";
    },
    onClick_changePasswordTwoStep() {
      if (!this.ruleForm3.password) {
        this.$alert("请输入新密码");
        return;
      }
      if (!this.ruleForm3.passwordSecond) {
        this.$alert("请再次输入新密码");
        return;
      }
      if (this.ruleForm3.password.length < 6) {
        this.$alert("密码长度不能小于6位");
        return;
      }
      if (this.ruleForm3.password !== this.ruleForm3.passwordSecond) {
        this.$alert("两次密码输入不一致");
        return;
      }
      api
        .changePassword(this.ruleForm3)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          })
          this.toAccountLogin();
        })
    },
    onClick_sendLoginCode() {
      const that = this;
      if (!this.ruleForm2.phone) {
        this.$alert("请输入手机号");
        return;
      }
      api
        .getSmsCode({
          phone: this.ruleForm2.phone,
          system: 'operation'
        })
        .then(res => {
          if (res.status === 0) {
            this.countLoginTime = 60;
            const interval = setInterval(() => {
              if (that.countLoginTime > 0) {
                that.countLoginTime--;
              } else {
                clearInterval(interval);
              }
            }, 1000);
            this.$message("已发送");
          }
        })
        .catch(() => {
          this.countLoginTime = 0;
        });
    },
    onClick_sendChangeCode() {
      const that = this;
      if (!this.ruleForm3.phone) {
        this.$alert("请输入手机号");
        return;
      }

      api
        .sendForgetCode({
          phone: this.ruleForm3.phone,
          system: 'operation'
        })
        .then(res => {
          if (res.status === 0) {
            this.countChangeTime = 60;
            const interval = setInterval(() => {
              if (that.countChangeTime > 0) {
                that.countChangeTime--;
              } else {
                clearInterval(interval);
              }
            }, 1000);
            this.$message({
              message: '已发送',
              type: 'success'
            });
          }
        })
        .catch(() => {
          this.countLoginTime = 0;
        });
    },
    toChangePasswd() {
      this.activeType = "changePasswdOneStep";
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
        .then(res => this.loginCallBack(res))
    },
    /**
     * 登录成功回调
     * @param res
     */
    loginCallBack(res) {
      if (res.status === 1) {
        if (res.code === 1010) { // 未注册，前往注册
          this.onClick_changeregister();
        } else if (res.code === 1040) { // 审核未通过，前往审核等待页
          this.$router.push({path: "/registSuccess"})
        }
        return;
      }
      const userId = res.object.user.id
      const roleId = res.object.user.roleId
      this.saveAccessToken(res.object.accessToken)
      this.saveUserInfo(res.object.user)
      this.connactWebSocket({
        from: 'operation',
        userId: userId,
        accessToken: res.object.accessToken
      });
      this.$store.dispatch('setTodoList');
      api.queryUserVueRouterList({
        userToken: res.object.accessToken,
        system: 'operation',
        userId: userId,
        roleId: roleId
      }).then(res => {
        computedRoleRouter(res.object)
        this.addRoutes();
        this.$router.push(`/index`);
        // if (this.$route.query.redirect) {
        //   this.$router.push({ path: `${this.$route.query.redirect}` });
        // } else {
        //   this.$router.push(`/index`);
        // }
      })
    },
    connactWebSocket ($params) {
      const from = $params.from ? $params.from : "";
      const userId = $params.userId ? $params.userId : "";
      const accessToken = $params.accessToken ? $params.accessToken : "";
      const ticket = $params.ticket ? $params.ticket : "";
      let query;
      if (ticket) {
        query = {from, ticket};
      } else {
        query = {from, userId, accessToken};
      }
      return this.saveWebsocketOption(query);
    },
    addRoutes() {
      const menuItems = store.state.role.routes;
      const routerList = currRouter.menusToRoutes(menuItems);
      this.$router.addRoutes(routerList);
      this.saveRoutersArr(routerList)
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
          type: 'message',
          code: this.ruleForm2.verification,
          system: 'operation',
          phone: this.ruleForm2.phone
        })
        .then(res => this.loginCallBack(res))
    },
    onClick_changeregister() {
      this.isRegister = true
      this.isLogin = false
    },
    onClick_changelogin() {
      this.isRegister = false
      this.isLogin = true
    },
    onClick_register() {
      if (!this.registerForm.company) {
        this.$alert("公司名称不能为空");
        return;
      }
      if (!this.registerForm.personName) {
        this.$alert("法人姓名不能为空");
        return;
      }
      if (!this.registerForm.personMobile) {
        this.$alert("法人手机号不能为空");
        return;
      }
      if (!this.$g.utils.checkPhone(this.registerForm.personMobile)) {
        this.$alert("请输入正确格式的手机号");
        return;
      }
      if (!this.registerForm.email) {
        this.$alert("邮箱不能为空");
        return;
      }
      if (!this.$g.utils.checkEmailOther(this.registerForm.email)) {
        this.$alert("请输入正确格式的邮箱");
        return;
      }
      if (!this.registerForm.provinceCode) {
        this.$alert("请选择所在省份");
        return;
      }
      if (!this.registerForm.address) {
        this.$alert("详细地址不能为空");
        return;
      }
      api.registerTopAgent(this.registerForm).then(res => {
        this.$message({
          type: 'succcess',
          message: '注册成功'
        });
        this.$router.push({path: '/registSuccess'})
      })
    }
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
        cursor: pointer;
      }
      .unactive-type {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(191, 191, 191, 1);
        line-height: 18px;
        cursor: pointer;
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
      cursor: pointer;
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
  cursor: pointer;
}
.bottom-box {
  margin-top: 16px;
}
</style>
