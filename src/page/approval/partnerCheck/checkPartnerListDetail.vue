<template>
  <div>
    <div class="tab_head">
      <span class="title">合伙人审核信息</span>
    </div>

    <transition name="fade">
      <div>
        <el-alert
          v-if="ruleForm.contractStatus === 'reject'"
          class="detail-alert"
          :title="ruleForm.reason"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
        <div>
          <detailMode v-if="ruleForm.jobType === '拓展员'" :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData1"></detailMode>
          <detailMode v-if="ruleForm.jobType === '入件操作员'" :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData2"></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <!-- <div class="btn_pass" @click="onClick_sign">通过</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div> -->
          <el-button type="primary" size="normal" @click="onClick_sign">通过</el-button>
          <el-button size="normal" @click="onClick_reject">驳回</el-button>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        :foot-btn-label="'确定'"
        label-width="100px"
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
import { FORM_CONFIG, CONFIG_DATA } from "../formConfig/checkServiceDetailConfig";

export default {
  name: "CheckPartnerListDetail",
  components: { detailMode, Form },

  data() {
    return {
      agentPartnerNo: '',
      fromConfigData: {},
      drawer: false,
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false,
        showOtherEdit: false
      },
      currentType: "", // pass通过 preApproval预审核 checking审核中 reject驳回
      ruleForm: {},
      configData: null
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "waitSign":
        case "audit":
          this.showComponents.showOperBtns = true;
          this.showComponents.showRejectTitle = false;
          break;
        case "success":
          this.showComponents.showOperBtns = false;
          this.showComponents.showRejectTitle = false;
          break;
        case "reject":
          this.showComponents.showRejectTitle = true;
          this.showComponents.showOperBtns = false;
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.configData = this.$g.utils.deepClone(CONFIG_DATA)
    this.agentPartnerNo = this.$route.query.agentPartnerNo
    this.getPartenDetail()
  },
  mounted() {},
  methods: {
    getPartenDetail() {
      api.getDetailByPartnerNo({
        agentPartnerNo: this.agentPartnerNo
      }).then(res => {
        if (res.data.jobType === 'expander') {
          res.data.jobType = '拓展员'
        }
        if (res.data.jobType === 'inboundMen') {
          res.data.jobType = '入件操作员'
        }
        if (res.data.cloudPayGt1000Rate) {
          res.data.cloudPayGt1000RatePecent = this.$g.utils.AccMul(res.data.cloudPayGt1000Rate, 1000) + '‰'
          res.data.cloudPayLe1000RatePecent = this.$g.utils.AccMul(res.data.cloudPayLe1000Rate, 1000) + '‰'
          res.data.kickbackPecent = this.$g.utils.AccMul(res.data.kickbackPercent, 1000) + '‰'
          res.data.alipayRatePecent = this.$g.utils.AccMul(res.data.alipayRate, 1000) + '‰'
        }
        this.ruleForm = res.data
        this.currentType = res.data.contractStatus
      })
    },
    confirm($data) {
      if (!$data.baseData && !$data.reason) {
        this.$message({
          message: '请填写驳回原因'
        })
        return
      }
      const actions = new Map([
        [1, '合伙人姓名与证件不符'],
        [2, '合伙人身份证正面照有误'],
        [3, '合伙人身份证反面照有误'],
        [4, '合伙人手持身份证有误'],
        ['default', '']
      ])
      let rejectReason = actions.get($data.baseData) || actions.get('default');
      if (rejectReason && $data.reason) {
        rejectReason = rejectReason + ',' + $data.reason
      } else if (!rejectReason && $data.reason) {
        rejectReason = $data.reason
      }
      api.agentPartnerReject({
        agentPartnerNo: this.agentPartnerNo,
        reason: rejectReason
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '已驳回',
            type: 'success'
          });
          this.$router.replace({
            name: 'checkPartner'
          })
        }
        this.drawer = false;
      })
    },
    onClick_sign() {
      api.agentPartnerPass({
        agentPartnerNo: this.agentPartnerNo
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '已通过',
            type: 'success'
          })
          this.$router.replace({
            name: 'checkPartner'
          })
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
    width: 113px;
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
