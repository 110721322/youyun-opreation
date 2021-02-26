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
    </div>
    <div class="flex-align-center flex-justify-center foot-btn">
      <div>
        <el-button type="primary" size="normal" @click="clickShopEditDetail">提交</el-button>
        <el-button size="normal" @click="clickCancleEdit">取消</el-button>
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
        shopInfoFormData: this.$g.utils.deepClone(FORM_CONFIG.shopInfoConfigData),
        verityInfoFormData: this.$g.utils.deepClone(FORM_CONFIG.verityInfoConfigData),
        settleInfoFormData: this.$g.utils.deepClone(FORM_CONFIG.settleInfoConfigData),
        rateInfoFormData: this.$g.utils.deepClone(FORM_CONFIG.rateInfoConfigData),
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
            this.shopInfoFormData[3].options = this.dealCateList(res.data) || []
          }
        })
      },
      dealCateList($arr) {
        return $arr.map((item,index) => {
          const newObj = {
            label: item.name,
            value: item.code,
          }
          if(this.$g.utils.isArr(item.childrenData)) {
            newObj.children=this.dealCateList(item.childrenData);
          }
          return newObj
        })
      },
      shopQueryDetail() {
        const params = {
          shopNo: this.$route.query.shopNo
        }
        api.shopQueryDetail(params).then(res => {
          if(res.status === 0) {
            this.shopDetail = res.data
            this.shopInfoFormData = this.$g.utils.eachFormTree(this.shopInfoFormData, this.shopDetail)
            this.verityInfoFormData = this.$g.utils.eachFormTree(this.verityInfoFormData, this.shopDetail)
            this.settleInfoFormData = this.$g.utils.eachFormTree(this.settleInfoFormData, this.shopDetail)
            this.rateInfoFormData = this.$g.utils.eachFormTree(this.rateInfoFormData, this.shopDetail)
          }
          this.getInfoShow = true
        })
      },
      clickShopEditDetail() {
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
        let infoData = {}
        Object.assign(infoData, checkShopForm, checkVerityForm, checkSettleForm, checkRateForm)
        const params = {
          id: this.$route.query.id,
          shopNo: this.shopDetail.shopNo,
          ...infoData,
          provinceCode: infoData.areaData[0],
          cityCode: infoData.areaData[1],
          areaCode: infoData.areaData[2],
          mccCode: infoData.mccCodeData[2],
          shopLicenseBegDate: infoData.shopLicenseDate[0]?infoData.shopLicenseDate[0]:'',
          shopLicenseEndDate: infoData.shopLicenseDate[1]?infoData.shopLicenseDate[1]:'',
          idCardBeginDate: infoData.idCardDate[0]?infoData.idCardDate[0]:'',
          idCardExpireDate: infoData.idCardDate[1]?infoData.idCardDate[1]:'',
          wechatPayRate: this.$g.utils.AccDiv(infoData.wechatPayRate, 100),
          alipayRate: this.$g.utils.AccDiv(infoData.alipayRate, 100)
        }
        api.shopEditDetail(params).then(res => {
          if (res.status === 0) {
            this.$router.back();
            this.$message({type:"success", message:'编辑成功'})
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
  }
</style>
