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
          @editTel="editTel"
        >
          <template slot-scope="scope" slot="switch">
            <!-- 授权 -->
            <span>启用</span>
          </template>
        </yun-detail-mode>
      </div>
    </div>
    <yun-dialog
      title="修改密码"
      :dialoger="modifyPasswordDialog"
      width="488px"
      @confirm="clickModifyPassword"
      @cancel="handleClose">
      <yun-form
          slot="body"
          ref="passwordForm"
          :form-base-data="passwordFormConfig"
          :label-width="'150px'"
          :show-foot-btn="false"
      ></yun-form>
    </yun-dialog>
    <yun-dialog
      title="修改登录手机号"
      :dialoger="modifyPhoneDialog"
      width="488px"
      @confirm="clickModifyPhone"
      @cancel="handleCloseForm"
      :before-close="handleCloseForm">
      <yun-form
          slot="body"
          ref="phoneForm"
          :form-base-data="phoneFormConfig"
          :label-width="'150px'"
          :show-foot-btn="false"
      ></yun-form>
    </yun-dialog>
  </div>
</template>

<script>
  import { FORM_CONFIG } from "../formConfig/accountCenter";
  export default {
    data() {
      return {
        accountInfoConfig: FORM_CONFIG.accountInfoData,
        ruleForm: {},
        modifyPasswordDialog: false,
        modifyPhoneDialog: false,
        passwordFormConfig: FORM_CONFIG.passwordFormConfig,
        phoneFormConfig: FORM_CONFIG.phoneFormConfig
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      clickModify() {
        this.modifyPasswordDialog = true
      },
      handleClose() {
        this.modifyPasswordDialog = false
      },
      editTel() {
        this.modifyPhoneDialog = true
      },
      clickModifyPassword() {
        if (!this.$refs.passwordForm.handleClick()) {
          this.$message('请完善修改信息');
          return;
        }
        this.modifyPasswordDialog = false
      },
      handleCloseForm() {
        this.modifyPhoneDialog = false
      },
      clickModifyPhone() {
        if (!this.$refs.phoneForm.handleClick()) {
          this.$message('请完善修改信息');
          return;
        }
        this.modifyPhoneDialog = false
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
    }
  }
  .edit-btn {
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 400;
    color: #1989FA;
    line-height: 20px;
    cursor: pointer;
  }
  .info-box {
    margin: 0 24px;
    padding-bottom: 24px;
  }
  .pay-box, .open-box {
    margin-top: 24px;
  }
  .foot-btn {
    padding: 16px 0;
    box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.09);
  }
  /deep/ .formTemplate {
    margin: 0;
  }
</style>
