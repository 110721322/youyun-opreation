<template>
  <div>
    <div class="content">
      <div class="title-box flex-align-center">
        <span class="title">账户中心</span>
        <span class="edit-btn" @click="clickModify">修改密码</span>
      </div>
      <div class="info-box">
        <yun-detail-mode
          :rule-form="ruleForm"
          :filed-config-list="accountInfoConfig"
          module-title="账户信息"
          theme="border"
          @editAccount="editAccount"
        >
        </yun-detail-mode>
      </div>
    </div>
    <update-psd
        ref="updatePsd"
        title="修改密码"
        :phone="phone"
    ></update-psd>
    <yun-dialog
        title="修改登录手机号"
        width="488px"
        :dialoger="updatePhoneDialoger"
        @confirm="updatePhone"
        @cancel="closeDialog"
    >
      <main slot="body" class="m-dialog-body">
        <yun-form
            style="margin: 0;padding: 0"
            ref="updatePhoneForm"
            v-if="updatePhoneDialoger"
            :form-base-data="formPhoneConfig"
            :show-foot-btn="false"
        >
          <template slot="oldCode">
            <el-button
                type="primary"
                class="f-fz-14"
                style="margin-left: 8px"
                v-show="oldCode.time <= 0"
                @click="clickSendCode('oldCode')"
            >获取验证码</el-button>
            <el-button
                type="primary"
                class="f-fz-14"
                style="margin-left: 8px"
                v-show="oldCode.time > 0">{{ oldCode.time + " s" }}</el-button>
          </template>
          <template slot="newCode">
            <el-button
                type="primary"
                class="f-fz-14"
                style="margin-left: 8px"
                v-show="newCode.time <= 0"
                @click="clickSendCode('newCode')">获取验证码</el-button>
            <el-button
                type="primary"
                class="f-fz-14"
                style="margin-left: 8px"
                v-show="newCode.time > 0">{{ newCode.time + " s" }}</el-button>
          </template>
        </yun-form>
      </main>
    </yun-dialog>
  </div>
</template>

<script>
  import UpdatePsd from "@/components/UpdatePsd/UpdatePsd";
  import { FORM_CONFIG } from "../formConfig/accountCenter";
  import { FORM_PHONE_CONFIG } from "../formConfig/accountCenter";
  import { validPhone } from "youyun-vue-components/global/kit/validate";
  import api from "@/api/api_account";
  import api_common from "@/api/api_common";
  export default {
    name: 'AccountCenter',
    components: {
      UpdatePsd
    },
    data() {
      return {
        accountInfoConfig: FORM_CONFIG,
        ruleForm: {},
        showModify: false,
        formPhoneConfig: null,
        updatePhoneDialoger: false,
        phone: '',
        oldCode: {
          time: 0,
          timer: null
        },
        newCode: {
          time: 0,
          timer: null
        }
      }
    },
    created() {
      this.getLoginUser()
    },
    methods: {
      getLoginUser() {
        api.getLoginUser({}).then(res => {
          if (res.status === 0) {
            this.ruleForm = res.data
            this.phone = this.ruleForm.phone
          }
        })
      },
      clickModify() {
        this.$refs.updatePsd.showUpdatePsd();
      },
      editAccount() {
        this.formPhoneConfig = this.$g.utils.deepClone(FORM_PHONE_CONFIG)
        this.formPhoneConfig[0].initVal = this.phone
        this.updatePhoneDialoger = true
      },
      updatePhone() {
        const ruleForm = this.$refs.updatePhoneForm.clickFootBtn();
        if (!ruleForm) {
          this.$message({
            type: 'info',
            message: '请完善信息'
          })
          return
        }
        api.updatePhone(ruleForm).then(() => {
          this.closeDialog();
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      },
      clickSendCode($namespace) {
        const strategies = {
          oldCode: {
            namespace: $namespace,
            phone: this.$refs.updatePhoneForm.ruleForm.oldPhone,
            apiService: api_common.sendSmsCode
          },
          newCode: {
            namespace: $namespace,
            phone: this.$refs.updatePhoneForm.ruleForm.newPhone,
            apiService: api_common.sendSmsCode
          }
        }
        this.sendCode(strategies[$namespace])
      },
      sendCode($conf) {
        const that = this;
        if (!$conf.phone) {
          this.$message("手机号不能为空");
          return;
        } else if (!validPhone($conf.phone)) {
          this.$message("请输入规范11位手机号");
          return;
        }
        return $conf.apiService({
          phone: $conf.phone,
          system: this.system
        })
          .then(res => {
            that[$conf.namespace].time = 60;
            that[$conf.namespace].timer = setInterval(() => {
              if (that[$conf.namespace].time > 0) {
                that[$conf.namespace].time--;
              } else {
                clearInterval(that[$conf.namespace].timer);
              }
            }, 1000);
            that.$message({
              type: "success",
              message: "已发送"
            });
          })
      },
      closeDialog() {
        clearInterval(this.oldCode.timer)
        clearInterval(this.newCode.timer)
        this.oldCode.time = 0;
        this.newCode.time = 0;
        this.updatePhoneDialoger = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 24px;
    background: white;
    .title-box {
      padding: 24px;
      width: 100%;
      .title {
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        line-height: 22px;
      }
      .edit-btn {
        flex-shrink: 0;
        font-size: 14px;
        font-weight: 400;
        color: #1989FA;
        line-height: 20px;
        cursor: pointer;
      }
    }
    .info-box {
      margin: 0 24px;
      padding-bottom: 24px;
    }
  }
  .m-dialog-body {
    padding: 22px 30px;
  }
</style>
