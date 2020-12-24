<template>
  <div>
    <div class="content">
      <div class="form-box" v-if="getInfoShow">
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
            ref="verityInfoForm"
            :show-foot-btn="false"
            :label-width="'120px'"
            :form-base-data="verityInfoFormData">
          </yun-form>
        </div>
        <div class="info-box">
          <div class="form-title">结算信息</div>
          <yun-form
            ref="settleInfoForm"
            :show-foot-btn="false"
            :label-width="'120px'"
            :form-base-data="settleInfoFormData">
          </yun-form>
        </div>
        <div class="info-box">
          <div class="form-title">费率信息</div>
          <yun-form
            ref="rateInfoForm"
            :show-foot-btn="false"
            :label-width="'120px'"
            :form-base-data="rateInfoFormData">
          </yun-form>
        </div>
      </div>
      <div class="flex-align-center flex-justify-center foot-btn">
        <div>
          <el-button type="primary" size="normal" @click="shopEditDetail">提交</el-button>
          <el-button size="normal" @click="cancleEdit">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { FORM_CONFIG } from "../formConfig/shopEditForm";
  import api from "@/api/api_shop";
  export default {
    data() {
      return {
        shopInfoFormData: FORM_CONFIG.shopInfoConfigData,
        verityInfoFormData: FORM_CONFIG.verityInfoConfigData,
        settleInfoFormData: FORM_CONFIG.settleInfoConfigData,
        rateInfoFormData: FORM_CONFIG.rateInfoConfigData,
        shopDetail: {},
        getInfoShow: false
      }
    },
    created() {
      this.shopQueryDetail()
    },
    mounted() {
    },
    methods: {
      shopQueryDetail() {
        const params = {
          shopNo: this.$route.query.shopNo
        }
        api.shopQueryDetail(params).then(res => {
          if(res.status === 0) {
            this.shopDetail = res.data
            this.shopInfoFormData.forEach((item,index) => {
              item.initVal = this.shopDetail[item.key]
            });
            this.verityInfoFormData.forEach((item,index) => {
              item.initVal = this.shopDetail[item.key]
            });
            this.settleInfoFormData.forEach((item,index) => {
              item.initVal = this.shopDetail[item.key]
            });
            this.rateInfoFormData.forEach((item,index) => {
              item.initVal = this.shopDetail[item.key]
            });
          }
          this.getInfoShow = true
        })
      },
      shopEditDetail() {
        const shopInfoForm = this.$refs.shopInfoForm.ruleForm;
        const verityInfoForm = this.$refs.verityInfoForm.ruleForm;
        const settleInfoForm = this.$refs.settleInfoForm.ruleForm;
        const rateInfoForm = this.$refs.rateInfoForm.ruleForm;
        const params = {
          id: this.$router.query.id,
          ...shopInfoForm,
          ...verityInfoForm,
          ...settleInfoForm,
          ...rateInfoForm
        }
        api.shopEditDetail(params).then(res => {
          if (res.status === 0) {
            this.$router.back();
            this.$message.success('编辑成功')
          }
        })
      },
      cancleEdit() {
        this.$router.back();
      }
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
