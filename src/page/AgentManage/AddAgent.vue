<template>
  <div class="m-page">
    <div class="m-content">
      <div class="m-title">新增服务商</div>
      <div class="m-service">
        <div class="m-box">
          <div class="m-service-title">服务商信息</div>
          <Form
              ref="serviceInfo"
              :form-base-data="fromConfigData.serviceData.formData"
              :show-foot-btn="fromConfigData.showFootBtn"
              label-width="130px"
          ></Form>
        </div>
        <div class="m-box">
          <div class="m-service-title">费率信息</div>
          <Form
              ref="rateInfo"
              :form-base-data="fromConfigData.rateData.formData"
              :show-foot-btn="fromConfigData.showFootBtn"
              label-width="130px"
          ></Form>
        </div>
        <div class="m-box m-nobord">
          <div class="m-service-title">结算账号</div>
          <Form
              ref="rateInfo"
              :form-base-data="fromConfigData.settleData.formData"
              :show-foot-btn="fromConfigData.showFootBtn"
              label-width="130px"
          ></Form>
        </div>
      </div>
    </div>
    <div class="m-btn">
      <el-button type="primary" @click="clickSubmit">提交</el-button>
      <el-button @click="clickCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  import Form from "@/components/form/index.vue";
  import { ADD_AGENT } from "./FormConfig/AddAgent";

  export default {
    name: "AddAgent",
    components: { Form },
    data() {
      return {
        fromConfigData: ADD_AGENT
      }
    },
    methods: {
      clickSubmit() {},
      clickCancel() {
        this.$router.back(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-form {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  /deep/ .el-form-item {
    width: 48%;
  }
  /deep/ .el-input {
    width: 100%;
  }
  .m-page {
    padding: 32px;
    .m-content {
      margin-bottom: 24px;
      background: #fff;
      .m-title {
        padding-left: 24px;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: #000;
        line-height: 54px;
        border-bottom: 1px solid #DCDFE6;
      }
      .m-service {
        padding: 24px 24px 16px;
        .m-box {
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 24px;
          .m-service-title {
            font-size: 14px;
            font-weight: 500;
          }
        }
        .m-box.m-nobord {
          border-bottom: 0;
        }
      }
    }
    .m-btn {
      display: flex;
      justify-content: center;
    }
  }
</style>