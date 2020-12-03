<template>
  <div>
    <div class="tab_head">
      <span class="title">平台风控详情</span>
    </div>

    <transition name="fade">
      <div>
        <el-alert
          v-if="showComponents.showRejectTitle"
          class="detail-alert"
          :title="'驳回原因:'+ ruleForm.reason"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
        <detailMode
          :img-width="4"
          :rule-form="ruleForm"
          :config-data="configData.baseData"
          :current-type="currentType"
        >
          <template v-slot="{ currentType }">
            <div class="current-type">
              <template v-if="currentType === 'pass'">
                <img :src="passImg" alt />
              </template>
              <template v-if="currentType === 'checking'">
                <img :src="approvalImg" alt />
              </template>
              <template v-if="currentType === 'reject'">
                <img :src="refuseImg" alt />
              </template>
            </div>
          </template>
        </detailMode>
        <detailMode
          :img-width="4"
          :rule-form="ruleForm"
          :config-data="configData.appealData"
        >
        </detailMode>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <!-- <div class="btn-pass" @click="clickSign">资料已检查，通过</div>
          <div class="btn-reject" @click="clickReject">驳回</div> -->
          <el-button type="primary" size="normal" @click="clickSign">资料已检查，通过</el-button>
          <el-button size="normal" @click="clickReject">驳回</el-button>
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
        @cancel="onClickCancel"
        @confirm="onClickConfirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_risk";
import passImg from "@/assets/img/pass.png";
import refuseImg from "@/assets/img/refuse.png";
import approvalImg from "@/assets/img/approval.png";
import detailMode from "@/components/detailMode/detailMode2.vue";
import Form from "@/components/form/index.vue";
import { CONFIG_DATA } from "../tableConfig/merchantRiskListDetail";
import { FORM_CONFIG } from "../formConfig/leRiskListDetailConfig";

export default {
  name: "MerchantLeRiskListDetail",
  components: { detailMode, Form },
  data() {
    return {
      id: '',
      passImg: passImg,
      refuseImg: refuseImg,
      approvalImg: approvalImg,
      fromConfigData: {},
      drawer: false,
      rejectTitle: "驳回原因：商户名称与营业执照不符合",
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false
      },
      phone: "",
      // pass通过 preApproval预审核 checking审核中 reject驳回
      currentType: "",
      ruleForm: {},
      configData: CONFIG_DATA
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "waitPreAudit":
          this.$set(this.showComponents, "showRejectTitle", false);
          this.$set(this.showComponents, "showOperBtns", true);
          break;
        case "channelPass":
          this.$set(this.showComponents, "showRejectTitle", false);
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "channelReject":
          this.$set(this.showComponents, "showOperBtns", false);
          this.$set(this.showComponents, "showRejectTitle", true);
          break;

        default:
          break;
      }
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    onClickConfirm($data) {
      if (!$data.reason) {
        this.$message({
          message: '请填写必填信息',
          type: 'warning'
        })
      } else {
        api.banGetDetail({
          id: this.id,
          reason: $data.reason
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已驳回',
              type: 'info'
            });
            this.getDetail()
            this.drawer = false
          }
        })
      }
    },

    getDetail() {
      api.appealGetData({
        id: this.id
      }).then(res => {
        this.ruleForm = res.data;
        this.currentType = res.data.status
      })
    },

    clickSign() {
      this.$confirm(
        "<strong>确定移出以下黑名单资料吗</strong><br/><strong style='color: #F5222D'>法人手机号：" +
          this.phone +
          "</strong>",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
        api.midPlatformUpdateOfPass({
          id: this.id
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getDetail()
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },

    onClickCancel() {
      this.drawer = false;
    },

    clickReject() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.rejectData;
    }
  }
};
</script>

<style lang="scss" scoped>
.current-type {
  position: absolute;
  top: -25px;
  right: 0;

  img {
    width: 75px;
    height: 75px;
  }
}

.btn-box {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 24px;

  .btn-pass {
    margin-left: 60px;
    width: 205px;
    height: 40px;
    background: #1989fa;
    border-radius: 4px;
    line-height: 40px;
    color: #fff;
  }

  .btn-reject {
    margin-left: 24px;
    width: 113px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(199, 200, 205, 1);
    line-height: 40px;
    color: #606266;
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
