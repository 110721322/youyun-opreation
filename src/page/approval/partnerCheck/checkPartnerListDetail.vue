<template>
  <div class>
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
          <detailMode :img-width="4" :rule-form="ruleForm" v-if="ruleForm.jobType === '拓展员'" :config-data="configData.baseData1"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" v-if="ruleForm.jobType === '入件操作员'" :config-data="configData.baseData2"></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_sign">通过</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
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
import { FORM_CONFIG } from "./../formConfig/checkServiceDetailConfig";

export default {
  name: "CheckServiceListDetail",
  components: { detailMode, Form },

  data() {
    return {
      agentPartnerNo: '',
      fromConfigData: {},
      drawer: false,
      rejectTitle: "驳回原因：商户名称与营业执照不符合",
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false,
        showOtherEdit: false
      },
      // pass通过 preApproval预审核 checking审核中 reject驳回
      currentType: "",
      ruleForm: {},
      configData: {
        baseData1: {
          name: "基本信息",
          items: [
            {
              name: "身份证正面照",
              key: "idPortraitImg",
              type: "image"
            },
            {
              name: "身份证反面照",
              key: "idEmblemImg",
              type: "image"
            },
            {
              name: "手持身份证照",
              key: "withIdImg",
              type: "image"
            },
            {
              name: "人员类型",
              key: "jobType"
            },
            {
              name: "合伙人姓名",
              key: "partnerName"
            },
            {
              name: "手机号码",
              key: "mobile"
            },
            {
              name: '登录密码',
              key: 'loginPassword'
            },
            {
              name: "支付宝/微信费率",
              key: "alipayRate"
            },
            {
              name: "云闪付费率（单笔≤1000元）",
              key: "cloudPayLe1000Rate"
            },

            {
              name: "云闪付费率（单笔＞1000元）",
              key: "cloudPayGt1000Rate"
            },
            {
              name: "合伙人佣金提成",
              key: "kickbackPercent"
            }
          ]
        },
        baseData2: {
          name: "基本信息",
          items: [
            {
              name: "身份证正面照",
              key: "idPortraitImg",
              type: "image"
            },
            {
              name: "身份证反面照",
              key: "idEmblemImg",
              type: "image"
            },
            {
              name: "手持身份证照",
              key: "withIdImg",
              type: "image"
            },
            {
              name: "人员类型",
              key: "jobType"
            },
            {
              name: "合伙人姓名",
              key: "partnerName"
            },
            {
              name: "手机号码",
              key: "mobile"
            },
            {
              name: '登录密码',
              key: 'loginPassword'
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
          this.showComponents.showOperBtns = true;
          this.showComponents.showRejectTitle = false;
          break;
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
          this.this.showComponents.showOperBtns = false;
          break;

        default:
          break;
      }
    }
  },
  created() {
    this.agentPartnerNo = this.$route.query.agentPartnerNo
    this.getPartenDetail()
  },
  mounted() {},
  methods: {
    getPartenDetail() {
      api.getDetailByPartnerNo({
        agentPartnerNo: this.agentPartnerNo
      }).then(res => {
        if (res.object.jobType === 'expand') {
          res.object.jobType = '拓展员'
        }
        if (res.object.jobType === 'join') {
          res.object.jobType = '入件操作员'
        }
        this.ruleForm = res.object
        this.currentType = res.object.contractStatus
      })
    },
    confirm($data) {
      var rejectReason
      if (!$data.baseData && !$data.reason) {
        this.$message({
          message: '请填写驳回原因'
        })
      } else {
        if ($data.baseData && !$data.reason) {
          if ($data.baseData === 1) {
            rejectReason = '合伙人姓名与证件不符'
          }
          if ($data.baseData === 2) {
            rejectReason = '合伙人身份证正面照有误'
          }
          if ($data.baseData === 3) {
            rejectReason = '合伙人身份证反面照有误'
          }
          if ($data.baseData === 4) {
            rejectReason = '合伙人手持身份证有误'
          }
        } else if (!$data.baseData && $data.reason) {
          rejectReason = $data.reason
        } else {
          if ($data.baseData === 1) {
            rejectReason = '合伙人姓名与证件不符,' + $data.reason
          }
          if ($data.baseData === 2) {
            rejectReason = '合伙人姓名与证件不符,' + $data.reason
          }
          if ($data.baseData === 3) {
            rejectReason = '合伙人姓名与证件不符,' + $data.reason
          }
          if ($data.baseData === 4) {
            rejectReason = '合伙人姓名与证件不符,' + $data.reason
          }
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
            this.getPartenDetail()
          }
          this.drawer = false;
        }).catch(err => {
          this.$message(err);
        });
      }
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
          this.getPartenDetail()
        }
      }).catch(err => {
        this.$message(err);
      });
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
