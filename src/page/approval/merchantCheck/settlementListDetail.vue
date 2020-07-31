<template>
  <div class>
    <div class="tab_head">
      <span class="title">商户结算卡预审核信息</span>
    </div>

    <transition name="fade">
      <div>
        <el-alert
          v-if="showComponents.showRejectTitle"
          class="detail-alert"
          :title="rejectTitle"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
        <detailMode :img-width="4" :rule-form="ruleForm.old" :config-data="configData.beforeData"></detailMode>
        <detailMode :img-width="4" :rule-form="ruleForm.new" :config-data="configData.afterData"></detailMode>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_pass">资料已全部检查,通过</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
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
import { FORM_CONFIG } from "./../formConfig/indirectDetailConfig";

export default {
  name: "SettlementListDetail",
  components: { detailMode, Form },

  data() {
    return {
      channelMerchantNo: '',
      channelAgentCode: '',
      channelCode: '',
      fromConfigData: {},
      drawer: false,
      rejectTitle: "驳回原因：银行卡号不属于法人",
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false
      },
      // approval通过 checking审核中 reject驳回
      currentType: "",
      ruleForm: {
        old: {},
        new: {}
      },
      configData: {
        beforeData: {
          name: "修改前信息",
          items: [
            {
              name: "结算人银行卡",
              key: "bankCardImg",
              type: "image"
            },
            {
              name: "结算人身份证正面",
              key: "idCardPortraitImg",
              type: "image"
            },
            {
              name: "结算人身份证反面",
              key: "idCardEmblemImg",
              type: "image"
            },
            {
              name: "非法人授权书",
              key: "nonLawSettleAuthImg",
              type: "image"
            },
            {
              name: "结算卡类型",
              key: "bankAccountType"
            },
            {
              name: "开户名",
              key: "openAccountName"
            },
            {
              name: "结算人身份证号",
              key: "settlePersonIdCard"
            },
            {
              name: "银行卡号",
              key: "bankCardNo"
            },

            {
              name: "开户支行地区",
              key: "bankArea"
            },
            {
              name: "开户支行",
              key: "bankBranchName"
            },
            {
              name: "银行预留手机号",
              key: "bankMobile"
            }
          ]
        },
        afterData: {
          name: "修改后信息",
          items: [
            {
              name: "结算人银行卡",
              key: "bankCardImg",
              type: "image"
            },
            {
              name: "结算人身份证正面",
              key: "idCardPortraitImg",
              type: "image"
            },
            {
              name: "结算人身份证反面",
              key: "idCardEmblemImg",
              type: "image"
            },
            {
              name: "非法人授权书",
              key: "nonLawSettleAuthImg",
              type: "image"
            },
            {
              name: "结算卡类型",
              key: "bankAccountType"
            },
            {
              name: "开户名",
              key: "openAccountName"
            },
            {
              name: "结算人身份证号",
              key: "settlePersonIdCard"
            },
            {
              name: "银行卡号",
              key: "bankCardNo"
            },

            {
              name: "开户支行地区",
              key: "bankArea"
            },
            {
              name: "开户支行",
              key: "bankBranchName"
            },
            {
              name: "银行预留手机号",
              key: "bankMobile"
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
          this.showComponents.showRejectTitle = false
          break;
        case "audit":
          this.showComponents.showOperBtns = true;
          this.showComponents.showRejectTitle = false
          break;
        case "success":
          this.showComponents.showOperBtns = false;
          this.showComponents.showRejectTitle = false
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
    this.channelMerchantNo = this.$route.query.channelMerchantNo
    this.channelAgentCode = this.$route.query.channelAgentCode
    this.channelCode = this.$route.query.channelCode
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      api.getMerchantSettleDetail({
        channelMerchantNo: this.channelMerchantNo,
        channelAgentCode: this.channelAgentCode,
        channelCode: this.channelCode
      }).then(res => {
        if (res.object.old.merchantType === 'enterprise') {
          res.object.old.merchantType = '企业'
        }
        if (res.object.old.merchantType === 'individual') {
          res.object.old.merchantType = '个体工商户'
        }
        if (res.object.old.merchantType === 'private') {
          res.object.old.merchantType = '个人'
        }
        if (res.object.old.bankAccountType === 'public') {
          res.object.old.bankAccountType = '对公'
        }
        if (res.object.old.bankAccountType === 'private') {
          res.object.old.bankAccountType = '对私'
        }
        if (res.object.new.merchantType === 'enterprise') {
          res.object.new.merchantType = '企业'
        }
        if (res.object.new.merchantType === 'individual') {
          res.object.new.merchantType = '个体工商户'
        }
        if (res.object.new.merchantType === 'private') {
          res.object.new.merchantType = '个人'
        }
        if (res.object.new.bankAccountType === 'public') {
          res.object.new.bankAccountType = '对公'
        }
        if (res.object.new.bankAccountType === 'private') {
          res.object.new.bankAccountType = '对私'
        }
        this.ruleForm = res.object
        this.currentType = res.object.auditStatus
        this.merchantType = res.onject.merchantType
      })
    },
    onClick_pass() {
      this.$confirm("是否校验完信息并通过", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认通过",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateAuditStatusOfPass({
          channelMerchantNo: this.channelMerchantNo,
          channelCode: this.channelCode
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getDetail()
          }
        }).catch(() => {});
      }).catch(() => {
        this.$message({
          message: '取消操作',
          type: 'info'
        })
      })
    },
    confirm($data) {
      if (!$data.reason) {
        this.$message({
          message: '请填写驳回原因',
          type: 'warning'
        })
        return false
      } else {
        api.updateAuditStatusOfReject({
          channelMerchantNo: this.channelMerchantNo,
          reason: $data["reason"],
          channelCode: this.channelCode
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getDetail()
            this.drawer = false
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    cancel() {
      this.drawer = false;
    },
    onClick_reject() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.rejectReason;
    },
    onClick_edit($item) {
      $item.edit = true;
    },
    onClick_okEdit($item) {
      $item.edit = false;
    },
    onClick_cancelEdit($item) {
      $item.edit = false;
    },
    getHeadClass() {
      return "background:#EFEFEF";
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  justify-content: center;
  text-align: center;
  .btn_pass {
    width: 205px;
    height: 40px;
    background: rgba(25, 137, 250, 1);
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

.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #52c41a;
  vertical-align: middle;
  margin: 0 5px;
  &.dotYellow {
    background-color: #ffae00;
  }
  &.dotGray {
    background: rgba(0, 0, 0, 0.25);
  }
  &.dotRed {
    background: #f5222d;
  }
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
