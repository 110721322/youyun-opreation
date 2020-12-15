<template>
  <div>
    <div class="content">
      <div class="title-box flex-align-center">
        <span class="title">账户中心</span>
        <span class="edit-btn" @click="clickModify">修改密码</span>
      </div>
      <div class="info-box">
        <InfoMode
          :rule-form="ruleForm"
          :config-data="accountInfoConfig"
        >
          <template slot-scope="scope" slot="switch">
            <!-- 授权 -->
            <span>启用</span>
          </template>
        </InfoMode>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="modifyPasswordDialog"
      width="30%"
      :before-close="handleClose">
      <Form
        ref="passwordForm"
        :form-base-data="passwordFormConfig"
        :label-width="'150px'"
        :show-foot-btn="false"
      ></Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyPasswordDialog = false">取 消</el-button>
        <el-button type="primary" @click="clickModifyPassword()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改登录手机号"
      :visible.sync="modifyPhoneDialog"
      width="30%"
      :before-close="handleCloseForm">
      <Form
        ref="phoneForm"
        :form-base-data="phoneFormConfig"
        :label-width="'150px'"
        :show-foot-btn="false"
      ></Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyPhoneDialog = false">取 消</el-button>
        <el-button type="primary" @click="clickModifyPhone()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { FORM_CONFIG } from "../formConfig/accountCenter";
  import InfoMode from "@/components/detailMode/shopDetailMode.vue";
  import Form from "@/components/form/index.vue";
  export default {
    components: { InfoMode, Form },
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
