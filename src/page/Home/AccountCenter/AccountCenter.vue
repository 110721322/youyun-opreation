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
        >
        </yun-detail-mode>
      </div>
    </div>
    <update-psd
        ref="updatePsd"
        title="修改密码"
        :phone="phone"
    ></update-psd>
  </div>
</template>

<script>
  import UpdatePsd from "@/components/UpdatePsd/UpdatePsd";
  import { FORM_CONFIG } from "../formConfig/accountCenter";
  import api from "@/api/api_account";
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
        phone: ''
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
</style>
