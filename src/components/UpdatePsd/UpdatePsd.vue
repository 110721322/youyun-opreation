<!--
  修改密码业务组件,登录页忘记密码入口，账户中心新修改密码入口
-->
<template>
  <yun-dialog
      :dialoger="forgetPsdDialoger"
      :title="title"
      width="488px"
      @confirm="updatePassword"
      @cancel="closeForget"
  >
    <main slot="body" class="m-dialog-forget">
      <yun-form
          style="margin: 0;padding: 0"
          ref="forgetPsdForm"
          v-if="forgetPsdDialoger"
          :form-base-data="formConfigPsd"
          :show-foot-btn="false"
      >
        <template slot="code">
          <el-button
              type="primary"
              class="f-fz-14"
              style="margin-left: 8px"
              v-show="countPsdTime <= 0"
              @click="clickSendPsdCode">获取验证码</el-button>
          <el-button
              type="primary"
              class="f-fz-14"
              style="margin-left: 8px"
              v-show="countPsdTime > 0">{{ countPsdTime + " s" }}</el-button>
        </template>
      </yun-form>
    </main>
  </yun-dialog>
</template>

<script>
  import api_common from "@/api/api_common";
  import {validPhone} from "youyun-vue-components/global/kit/validate";
  import {FORM_CONFIG} from "./FormConfig/UpdatePsdForm";

  export default {
    name: "UpdatePsd",
    props: {
      title: {
        type: String,
        default: '修改密码'
      },
      phone: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        system: 'operation',
        countPsdTime: 0,
        formConfigPsd: null,
        forgetPsdDialoger: false
      }
    },
    mounted() {
    },
    methods: {
      clickSendPsdCode() {
        const that = this;
        const ruleForm = this.$refs.forgetPsdForm.ruleForm;
        if (!ruleForm.phone) {
          this.$message("请输入手机号");
          return;
        } else if (!validPhone(ruleForm.phone)) {
          this.$message("请输入规范11位手机号");
          return;
        }
        api_common
          .sendForgetPasswordCode({
            phone: ruleForm.phone,
            system: this.system
          })
          .then(res => {
            this.countPsdTime = 60;
            const interval = setInterval(() => {
              if (that.countPsdTime > 0) {
                that.countPsdTime--;
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
            this.countPsdTime = 0;
          });
      },
      showUpdatePsd() {
        this.formConfigPsd = this.$g.utils.deepClone(FORM_CONFIG);
        this.formConfigPsd[1].initVal = this.phone
        this.forgetPsdDialoger = true
      },
      closeForget() {
        this.forgetPsdDialoger = false;
      },
      updatePassword() {
        const that = this;
        const ruleForm = this.$refs.forgetPsdForm.clickFootBtn();
        if (!ruleForm) {
          this.$message('请完善信息');
          return
        }
        const params = Object.assign({ system: this.system}, ruleForm)
        api_common.updatePassword(params).then(res => {
          try {
            that.$message({
              type: 'success',
              message: '修改成功'
            })
          } catch (e) {}
          that.closeForget();
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-dialog-forget {
    padding: 22px 40px;
  }
</style>
