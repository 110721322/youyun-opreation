<template>
  <div>
    <div class="content">
      <div class="form-box">
        <div class="info-box">
          <div class="form-title">门店信息</div>
          <yun-form
            ref="shopInfoForm"
            :show-foot-btn="false"
            :form-base-data="shopInfoFormData">
          </yun-form>
        </div>
        <div class="info-box">
          <div class="form-title">认证信息</div>
          <yun-form
            ref="verityInfoFormData"
            :show-foot-btn="false"
            :label-width="'120px'"
            :form-base-data="verityInfoFormData">
          </yun-form>
        </div>
        <div class="info-box">
          <div class="form-title">结算信息</div>
          <yun-form
            ref="settleInfoFormData"
            :show-foot-btn="false"
            :label-width="'120px'"
            :form-base-data="settleInfoFormData">
          </yun-form>
        </div>
        <div class="info-box">
          <div class="form-title">费率信息</div>
          <yun-form
            ref="rateInfoFormData"
            :show-foot-btn="false"
            :label-width="'120px'"
            :form-base-data="rateInfoFormData">
          </yun-form>
        </div>
      </div>
      <div class="flex-align-center flex-justify-center foot-btn">
        <div>
          <el-button type="primary" size="normal">提交</el-button>
          <el-button size="normal">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { FORM_CONFIG } from "../formConfig/shopEditForm";
  export default {
    data() {
      return {
        shopInfoFormData: FORM_CONFIG.shopInfoConfigData,
        verityInfoFormData: FORM_CONFIG.verityInfoConfigData,
        settleInfoFormData: FORM_CONFIG.settleInfoConfigData,
        rateInfoFormData: FORM_CONFIG.rateInfoConfigData
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 24px;
    background: white;
  }
  .form-box {
    padding: 24px;
    .form-title {
      margin-bottom: 24px;
      font-size: 14px;
      font-weight: 500;
      color: #000000;
      line-height: 20px;
    }
    /deep/ .formTemplate {
      margin: 24px;
    }
    .info-box {
      margin-bottom: 24px;
      border-bottom: 1px solid #EBEEF5;
    }
  }
  .foot-btn {
    padding: 16px 0;
    box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.09);
  }
</style>
