<template>
  <div>
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
        <detailMode
          v-if="ruleForm.old.bankAccountType === 'public'"
          :img-width="4"
          :rule-form="ruleForm.old"
          :config-data="configData.beforeData"
        ></detailMode>
        <detailMode
          v-if="ruleForm.old.bankAccountType === 'private' && ruleForm.old.snewnewettleLawFlag === 'legal'"
          :img-width="4"
          :rule-form="ruleForm.old"
          :config-data="configData.beforeData1"
        ></detailMode>
        <detailMode
          v-if="ruleForm.old.bankAccountType === 'private' && ruleForm.old.settleLawFlag === 'unlegal'"
          :img-width="4"
          :rule-form="ruleForm.old"
          :config-data="configData.beforeData2"
        ></detailMode>
        <detailMode
          v-if="ruleForm.new.bankAccountType === 'public'"
          :img-width="4"
          :rule-form="ruleForm.new"
          :config-data="configData.afterData"
        ></detailMode>
        <detailMode
          v-if="ruleForm.new.bankAccountType === 'private' && ruleForm.new.settleLawFlag === 'legal'"
          :img-width="4"
          :rule-form="ruleForm.new"
          :config-data="configData.afterData1"
        ></detailMode>
        <detailMode
          v-if="ruleForm.new.bankAccountType === 'private' && ruleForm.new.settleLawFlag === 'unlegal'"
          :img-width="4"
          :rule-form="ruleForm.new"
          :config-data="configData.afterData2"
        ></detailMode>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <el-button type="primary" size="normal" @click="onClick_pass">资料已全部检查,通过</el-button>
          <el-button size="normal" @click="onClick_reject">驳回</el-button>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
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
import { SETTLE_CONFIG } from "./../tableConfig/settleConfig"
import { FORM_CONFIG } from "./../formConfig/indirectDetailConfig";

export default {
  name: "SettlementListDetail",
  components: { detailMode, Form },

  data() {
    return {
      id: '',
      fromConfigData: {},
      drawer: false,
      rejectTitle: "",
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
      configData: SETTLE_CONFIG.configData
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "waitSign":
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
    this.id = this.$route.query.id
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      api.getMerchantSettleDetail({
        id: this.id
      }).then(res => {
        let ruleForm = res.data;
        ruleForm = this.initOldDetail(ruleForm);
        ruleForm = this.initNewDetail(ruleForm);
        this.ruleForm = ruleForm
        this.rejectTitle = "驳回原因：" + res.data.rejectReason
        this.currentType = res.data.auditStatus
        this.merchantType = res.onject.merchantType
      })
    },
    initOldDetail($ruleForm) {
      if ($ruleForm.old.merchantType === 'enterprise') {
        $ruleForm.old.merchantType = '企业'
      } else if ($ruleForm.old.merchantType === 'individual') {
        $ruleForm.old.merchantType = '个体工商户'
      } else if ($ruleForm.old.merchantType === 'private') {
        $ruleForm.old.merchantType = '个人'
      }
      if ($ruleForm.old.bankAccountType === 'public') {
        $ruleForm.old.bankAccountTypeCn = '对公-法人'
      } else if ($ruleForm.old.bankAccountType === 'private') {
        if ($ruleForm.old.settleLawFlag === 'legal') {
          $ruleForm.old.bankAccountTypeCn = '对私-法人'
        } else if ($ruleForm.old.settleLawFlag === 'unlegal') {
          $ruleForm.old.bankAccountTypeCn = '对私-非法人'
        }
      }
      return $ruleForm;
    },
    initNewDetail($ruleForm) {
      if ($ruleForm.new.merchantType === 'enterprise') {
        $ruleForm.new.merchantType = '企业'
      } else if ($ruleForm.new.merchantType === 'individual') {
        $ruleForm.new.merchantType = '个体工商户'
      } else if ($ruleForm.new.merchantType === 'private') {
        $ruleForm.new.merchantType = '个人'
      }
      if ($ruleForm.new.bankAccountType === 'public') {
        $ruleForm.new.bankAccountTypeCn = '对公-法人'
      } else if ($ruleForm.new.bankAccountType === 'private') {
        if ($ruleForm.new.settleLawFlag === 'legal') {
          $ruleForm.new.bankAccountTypeCn = '对私-法人'
        } else if ($ruleForm.new.settleLawFlag === 'unlegal') {
          $ruleForm.new.bankAccountTypeCn = '对私-非法人'
        }
      }
      return $ruleForm;
    },
    onClick_pass() {
      this.$confirm("是否校验完信息并通过", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认通过",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateAuditStatusOfPass({
          id: this.id
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
      }
      api.updateAuditStatusOfReject({
        id: this.id,
        reason: $data["reason"]
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getDetail()
          this.drawer = false
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
  margin-bottom: 24px;
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
