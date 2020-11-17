<template>
  <div>
    <div class="tab_head">
      <span class="title">商户预审核信息</span>
    </div>

    <transition name="fade">
      <div>
        <el-alert
          v-if="showComponents.showRejectTitle"
          class="detail-alert"
          :title="'驳回原因：' + ruleForm.reason"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
        <div>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData" v-if="ruleForm.businessType === 'enterprise'"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData1" v-if="ruleForm.businessType === 'individual' || ruleForm.businessType === ''" ></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.serviceSetupData"></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_sign">资料已检查并提交签约</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        :foot-btn-label="'确定'"
        label-width="130px"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_merchantAudit";
import detailMode from "@/components/detailMode/detailMode2.vue";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./../formConfig/checkServiceDetailConfig";
import areaData from "@/assets/data/areaData";

export default {
  name: "CheckServiceListDetail",
  components: { detailMode, Form },

  data() {
    return {
      agentNo: '',
      fromConfigData: {},
      drawer: false,
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false,
        showOtherEdit: false
      },
      // pass通过 preApproval预审核 checking审核中 reject驳回
      currentType: "",
      ruleForm: {},
      configData: {
        baseData: {
          name: "基本信息",
          items: [
            {
              name: "所属上级服务商",
              key: "parentAgentName"
            },
            {
              name: "账号类型",
              key: "businessTypeCn"
            },
            {
              name: "营业执照",
              key: "businessLicenseImg",
              type: "image"
            },
            {
              name: "法人身份证正面照",
              key: "idPortraitImg",
              type: "image"
            },
            {
              name: "法人身份证反面照",
              key: "idEmblemImg",
              type: "image"
            },

            {
              name: "公司名称",
              key: "agentName"
            },
            {
              name: "法人姓名",
              key: "personName"
            },
            {
              name: "法人手机号",
              key: "personMobile"
            },
            {
              name: "地区",
              key: "areaAddress"
            },

            {
              name: "详细地址",
              key: "companyAddress"
            },
            {
              name: "邮箱",
              key: "email"
            }
          ]
        },
        baseData1: {
          name: "基本信息",
          items: [
            {
              name: "所属上级服务商",
              key: "parentAgentName"
            },
            {
              name: "账号类型",
              key: "businessTypeCn"
            },
            {
              name: "法人身份证正面照",
              key: "idPortraitImg",
              type: "image"
            },
            {
              name: "法人身份证反面照",
              key: "idEmblemImg",
              type: "image"
            },

            {
              name: "公司名称",
              key: "agentName"
            },
            {
              name: "法人姓名",
              key: "personName"
            },
            {
              name: "法人手机号",
              key: "personMobile"
            },
            {
              name: "地区",
              key: "areaAddress"
            },

            {
              name: "详细地址",
              key: "companyAddress"
            },
            {
              name: "邮箱",
              key: "email"
            }
          ]
        },
        serviceSetupData: {
          name: "下级服务商设置",
          items: [
            {
              name: "服务区域",
              key: "activeScope"
            },
            {
              name: "微信/支付宝费率",
              key: "alipayRatePecent"
            },
            {
              name: "云闪付费率（单笔≤1000元）",
              key: "cloudPayLe1000RatePecent"
            },
            {
              name: "云闪付费率（单笔＞1000元）",
              key: "cloudPayLe1000RatePecent"
            }
          ]
        }
      }
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "waitSign":
          this.$set(this.showComponents, "showOperBtns", true);
          break
        case "audit":
          this.$set(this.showComponents, "showOperBtns", true);
          break;
        case "success":
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "reject":
          this.$set(this.showComponents, "showRejectTitle", true);
          this.$set(this.showComponents, "showOperBtns", false);
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.agentNo = this.$route.query.agentNo
    this.getServiceData()
  },
  methods: {
    getServiceData() {
      api.getSubAgentDetail({
        agentNo: this.agentNo
      }).then(res => {
        if (res.data.bankAccountType === 'public') {
          res.data.bankAccountType = '对公'
        }
        if (res.data.bankAccountType === 'private') {
          res.data.bankAccountType = '对私'
        }
        if (res.data.businessType === 'enterprise') {
          res.data.businessTypeCn = '企业'
        }
        if (res.data.businessType === 'individual' || res.data.businessType === '') {
          res.data.businessTypeCn = '个人'
        }
        var result = this.$g.utils.getNestedArr(areaData, 'children')
        result.forEach(m => {
          if (res.data.cityCode === m.value) {
            res.data.cityName = m.label
          }
          if (res.data.areaCode === m.value) {
            res.data.areaName = m.label
          }
          if (res.data.provinceCode === m.value) {
            res.data.provinceName = m.label
          }
          if (res.data.activeScopeCityCode === m.value) {
            res.data.activeScopeCityName = m.label
          }
          if (res.data.activeScopeProvinceCode === m.value) {
            res.data.activeScopeProvinceName = m.label
          }
          res.data.activeScope = res.data.activeScopeProvinceName + res.data.activeScopeCityName
        })
        res.data.areaAddress = res.data.provinceName + res.data.cityName + res.data.areaName
        if (res.data.cloudPayGt1000Rate) {
          res.data.cloudPayGt1000RatePecent = this.$g.utils.AccMul(res.data.cloudPayGt1000Rate, 1000) + '‰'
          res.data.cloudPayLe1000RatePecent = this.$g.utils.AccMul(res.data.cloudPayLe1000Rate, 1000) + '‰'
        }
        if (!res.data.cloudPayGt1000Rate) {
          res.data.cloudPayGt1000RatePecent = 0 + '‰'
          res.data.cloudPayLe1000RatePecent = 0 + '‰'
        }
        if (res.data.alipayRate || res.data.wechatPayRate) {
          res.data.alipayRatePecent = this.$g.utils.AccMul(res.data.alipayRate, 1000) + '‰'
          res.data.wechatPayRatePecent = this.$g.utils.AccMul(res.data.wechatPayRatePecent, 1000) + '‰'
        }
        this.ruleForm = res.data
        this.currentType = res.data.contractStatus
      }).catch();
    },
    confirm($data) {
      if ((!$data.reason) && (!$data.baseData)) {
        this.$message({
          message: '请选择/填写驳回理由',
          type: 'warning'
        })
        return false
      } else {
        api.updateSubAuditStatusOfReject({
          agentNo: this.agentNo,
          reason: $data["reason"]
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已驳回',
              type: 'success'
            })
            this.drawer = false;
            this.getServiceData()
          }
        })
      }
    },
    onClick_sign() {
      api.updateSubAuditStatusOfPass({
        agentNo: this.agentNo
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '已通过',
            type: 'success'
          })
          this.getServiceData()
        }
      })
    },
    cancel() {
      this.drawer = false;
    },
    onClick_reject() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.rejectReason;
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  justify-content: center;
  text-align: center;
  .btn_download {
    font-size: 14px;
    font-weight: 400;
    color: #1989fa;
    line-height: 40px;
    letter-spacing: 1px;
  }
  .btn_pass {
    margin-left: 60px;
    width: 205px;
    height: 40px;
    background: #1989fa;
    border-radius: 4px;
    line-height: 40px;
    color: #ffffff;
  }
  .btn-reject {
    width: 113px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(199, 200, 205, 1);
    line-height: 40px;
    color: #606266;
    margin-left: 24px;
  }
}
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}
.detail-alert {
  margin: 24px;
  padding: 9px 24px;
  background-color: #ffe8e9;
  border: 1px solid #ff7f85;
  color: #f5222d;
  width: auto;
}
</style>
