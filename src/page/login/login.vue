<template>
  <div class="page_box">
    <div class="main">
      <div class="big_box"></div>

      <div class="head">
        <div class="logo fw">
          <!-- <img src="@/assets/img/logol.png"> -->
        </div>
      </div>
      <div class="form-box">
        <div class="title">xxx系统</div>
        <div class="title-text">Business management system</div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px" class="ruleForm">
          <el-form-item prop="account" style="margin-bottom: 28px;">
            <el-input v-model="ruleForm.account" placeholder="请输入商家账号" size="medium"></el-input>
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 64px;" size="medium">
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="请输入登录密码"
              @keyup.enter.native="onClick_login('ruleForm')"
            ></el-input>
          </el-form-item>
          <div>
            <el-button
              class="login-btn"
              type="primary"
              size="medium"
              :loading="loading"
              @click="onClick_login('ruleForm')"
            >登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="copyright">Copyright 2016-2020 of Hangzhou aduer Technology Co., All Rights Reserved</div>
  </div>
</template>
<script type="text/ecmascript-6">
// import api from '@/api/api_login';
// import * as g from '@/libs/global';

export default {
  components: {},
  data() {
    return {
      loading: false,
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
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
      }
    };
  },
  watch: {},
  created() {},
  methods: {
    onClick_login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          // api.login({
          //     loginAccount: this.ruleForm.account,
          //     loginPassword: this.ruleForm.password,
          // }).then((result) => {
          //     this.loading = false;
          //     window.localStorage.setItem('token-merchant', result.object.userToken);
          //     let merchantUser = JSON.stringify(result.object.merchantUser);
          //     window.localStorage.setItem('userInfo-merchant', merchantUser);

          //     g.fun.getMenuList(() => {

          //         this.$router.replace({
          //             path: g.menuModel.list[0].url,
          //             query: {
          //                 roleType: g.menuModel.list[0].menuName.indexOf('-') !== -1
          //                     ? g.menuModel.list[0].menuName.substring(g.menuModel.list[0].menuName.length - 1, g.menuModel.list[0].menuName.length) : '',
          //             },
          //         });
          //     });

          // }).catch(() => {
          //     this.loading = false;
          //     this.ruleForm = {
          //         account: '',
          //         password: '',
          //     };
          // });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/login.scss";
</style>
