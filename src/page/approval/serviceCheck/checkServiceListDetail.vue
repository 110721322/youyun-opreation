<template>
  <div>
    <div class="tab-head">
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
          <detailMode
            v-if="ruleForm.businessType === 'enterprise'"
            :img-width="4"
            :rule-form="ruleForm"
            :config-data="configData.baseData"
          ></detailMode>
          <detailMode
            v-if="ruleForm.businessType === 'individual' || ruleForm.businessType === ''"
            :img-width="4"
            :rule-form="ruleForm"
            :config-data="configData.baseData1"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm"
            :config-data="configData.serviceSetupData"
          ></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_sign">资料已检查并提交签约</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
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
import { FORM_CONFIG, CONFIG_DATA_SERVICE } from "../formConfig/checkServiceDetailConfig";
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
      configData: null
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
  created() {
    this.configData = this.$g.utils.deepClone(CONFIG_DATA_SERVICE)
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
        let ruleForm = res.data;
        ruleForm = this.setBankAccountType(ruleForm);
        ruleForm = this.setAddress(ruleForm);
        this.ruleForm = this.setRate(ruleForm);
        this.currentType = ruleForm.contractStatus
      })
    },
    setBankAccountType($ruleForm) {
      if ($ruleForm.bankAccountType === 'public') {
        $ruleForm.bankAccountType = '对公'
      }
      if ($ruleForm.bankAccountType === 'private') {
        $ruleForm.bankAccountType = '对私'
      }
      if ($ruleForm.businessType === 'enterprise') {
        $ruleForm.businessTypeCn = '企业'
      }
      if ($ruleForm.businessType === 'individual' || $ruleForm.businessType === '') {
        $ruleForm.businessTypeCn = '个人'
      }
      return $ruleForm
    },
    setAddress($ruleForm) {
      const result = this.$g.utils.getNestedArr(areaData, 'children')
      result.forEach(m => {
        if ($ruleForm.cityCode === m.value) {
          $ruleForm.cityName = m.label
        }
        if ($ruleForm.areaCode === m.value) {
          $ruleForm.areaName = m.label
        }
        if ($ruleForm.provinceCode === m.value) {
          $ruleForm.provinceName = m.label
        }
        if ($ruleForm.activeScopeCityCode === m.value) {
          $ruleForm.activeScopeCityName = m.label
        }
        if ($ruleForm.activeScopeProvinceCode === m.value) {
          $ruleForm.activeScopeProvinceName = m.label
        }
        $ruleForm.activeScope = $ruleForm.activeScopeProvinceName + $ruleForm.activeScopeCityName
      })
      $ruleForm.areaAddress = $ruleForm.provinceName + $ruleForm.cityName + $ruleForm.areaName
      return $ruleForm
    },
    setRate($ruleForm) {
      if ($ruleForm.cloudPayGt1000Rate) {
        $ruleForm.cloudPayGt1000RatePecent = this.$g.utils.AccMul($ruleForm.cloudPayGt1000Rate, 1000) + '‰'
        $ruleForm.cloudPayLe1000RatePecent = this.$g.utils.AccMul($ruleForm.cloudPayLe1000Rate, 1000) + '‰'
      }
      if (!$ruleForm.cloudPayGt1000Rate) {
        $ruleForm.cloudPayGt1000RatePecent = 0 + '‰'
        $ruleForm.cloudPayLe1000RatePecent = 0 + '‰'
      }
      if ($ruleForm.alipayRate || $ruleForm.wechatPayRate) {
        $ruleForm.alipayRatePecent = this.$g.utils.AccMul($ruleForm.alipayRate, 1000) + '‰'
        $ruleForm.wechatPayRatePecent = this.$g.utils.AccMul($ruleForm.wechatPayRatePecent, 1000) + '‰'
      }
      return $ruleForm
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
.table-box {
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
