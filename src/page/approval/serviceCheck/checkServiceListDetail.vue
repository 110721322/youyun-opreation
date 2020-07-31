<template>
  <div class>
    <div class="tab_head">
      <span class="title">商户预审核信息</span>
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
        <div>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm"
            :config-data="configData.baseData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm.serviceSetupData"
            :config-data="configData.serviceSetupData"
          ></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_sign">资料已检查并提交签约</div>
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

export default {
  name: "CheckServiceListDetail",
  components: { detailMode, Form },

  data() {
    return {
      agentNo: '',
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
        baseData: {
          name: "基本信息",
          items: [
            {
              name: "所属上级服务商",
              key: "parentAgentName"
            },
            {
              name: "账号类型",
              key: "type"
            },
            {
              name: "营业执照",
              key: "pic",
              type: "image"
            },
            {
              name: "法人身份证正面照",
              key: "pic2",
              type: "image"
            },
            {
              name: "法人身份证反面照",
              key: "pic3",
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
              key: "phone"
            },
            {
              name: "地区",
              key: "areaName"
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
            // {
            //   name: "服务区域",
            //   key: "address"
            // },
            // {
            //   name: "服务方式",
            //   key: "way"
            // },
            // {
            //   name: "微信/支付宝费率",
            //   key: "aliWxPerc"
            // },
            // {
            //   name: "云闪付费率（单笔≤1000元）",
            //   key: "yunLessPerc"
            // },
            // {
            //   name: "云闪付费率（单笔＞1000元）",
            //   key: "yunMorePerc"
            // }
          ]
        }
      }
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "pass":
          this.$set(this.showComponents, "showOtherEdit", true);
          break;
        case "preApproval":
          this.$set(this.showComponents, "showOperBtns", true);
          break;
        case "checking":
          break;
        case "reject":
          this.$set(this.showComponents, "showRejectTitle", true);
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
        this.ruleForm = res.object
      }).catch();
    },
    confirm($data) {
      console.log($data);
      api
        .updateSubAuditStatusOfReject({
          agentNo: "",
          reason: $data["reason"]
        })
        .then(res => {
          this.$message("已驳回");
          this.drawer = false;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    onClick_sign() {
      api
        .updateSubAuditStatusOfPass({
          agentNo: ""
        })
        .then(res => {
          this.$message("已通过");
        })
        .catch(err => {
          this.$message(err);
        });
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
