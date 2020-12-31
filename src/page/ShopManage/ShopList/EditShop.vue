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
          <el-button type="primary" size="normal" @click="clickShopEditDetail">提交</el-button>
          <el-button size="normal" @click="clickCancleEdit">取消</el-button>
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
      this.getCategoryList()
      this.shopQueryDetail()
    },
    mounted() {
    },
    methods: {
      getCategoryList() {
        api.queryAllCategory({}).then(res => {
          if (res.status === 0) {
            const newArr = []
            this.dealCateList(res.data, newArr)
            this.shopInfoFormData[3].options = newArr || []
          }
        })
      },
      dealCateList(arr, newArr) {
        arr.forEach((item,index) => {
          newArr[index] = {}
          newArr[index].label = item.name;
          newArr[index].value = item.code;
          if(item.childrenData) {
            const arr=[];
            this.dealCateList(item.childrenData,arr);
            newArr[index].children=arr;  
          }
        });
      },
      shopQueryDetail() {
        const params = {
          shopNo: this.$route.query.shopNo
        }
        api.shopQueryDetail(params).then(res => {
          if(res.status === 0) {
            this.shopDetail = res.data
            this.shopInfoFormData.forEach((item,index) => {
              item.initVal = this.shopDetail[item.key]
              if (item.key === "areaData") {
                item.initVal = [this.shopDetail.provinceCode, this.shopDetail.cityCode, this.shopDetail.areaCode]
              }
            });
            this.verityInfoFormData.forEach((item,index) => {
              item.initVal = this.shopDetail[item.key]
              if (item.key === "shopLicenseDate") {
                item.initVal = [this.shopDetail.shopLicenseBegDate, this.shopDetail.shopLicenseEndDate]
              }
              if (item.key === "idCardDate") {
                item.initVal = [this.shopDetail.idCardBeginDate, this.shopDetail.idCardExpireDate]
              }
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
      clickShopEditDetail() {
        const shopInfoForm = this.$g.utils.deepClone(this.$refs.shopInfoForm.ruleForm);
        const verityInfoForm = this.$g.utils.deepClone(this.$refs.verityInfoForm.ruleForm);
        const settleInfoForm = this.$g.utils.deepClone(this.$refs.settleInfoForm.ruleForm);
        const rateInfoForm = this.$g.utils.deepClone(this.$refs.rateInfoForm.ruleForm);
        const checkShopForm = this.$refs.shopInfoForm.clickFootBtn();
        const checkVerityForm = this.$refs.verityInfoForm.clickFootBtn();
        const checkSettleForm = this.$refs.settleInfoForm.clickFootBtn();
        const checkRateForm = this.$refs.rateInfoForm.clickFootBtn();
        if (!checkShopForm) {
          this.$message('请完善门店信息');
          return
        }
        if (!checkVerityForm) {
          this.$message('请完善认证信息');
          return
        }
        if (!checkSettleForm) {
          this.$message('请完善结算信息');
          return
        }
        if (!checkRateForm) {
          this.$message('请完善费率信息');
          return
        }
        const params = {
          id: this.$route.query.id,
          ...shopInfoForm,
          provinceCode: shopInfoForm.areaData[0],
          cityCode: shopInfoForm.areaData[1],
          areaCode: shopInfoForm.areaData[2],
          ...verityInfoForm,
          shopLicenseBegDate: verityInfoForm.shopLicenseBegDate[0],
          shopLicenseEndDate: verityInfoForm.shopLicenseBegDate[1],
          idCardBeginDate: verityInfoForm.idCardDate[0],
          idCardExpireDate: verityInfoForm.idCardDate[1],
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
      clickCancleEdit() {
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
