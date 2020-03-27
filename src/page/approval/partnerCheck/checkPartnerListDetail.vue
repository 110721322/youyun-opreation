<template>
  <div class>
    <div class="tab_head">
      <span class="title">合伙人审核信息</span>
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
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData"></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_sign">通过</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false">
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
      ruleForm: {
        baseData: {
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic2:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic3:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          type: "拓展员",
          partnerName: "红莲",
          phone: "15823622321",
          password: "231242",
          aliwxPerc: "2.6‰",
          yunLessPerc: "2.8‰",
          yunMorePerc: "5.8‰",
          commissionPerc: "50%"
        }
      },
      configData: {
        baseData: {
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
              name: "登录密码",
              key: "loginPassword"
            },
            {
              name: "支付宝/微信费率",
              key: "aliweFeeRate"
            },
            {
              name: "云闪付费率（单笔≤1000元）",
              key: "le1000"
            },

            {
              name: "云闪付费率（单笔＞1000元）",
              key: "gt1000"
            },
            {
              name: "合伙人佣金提成",
              key: "kickbackPercent"
            }
          ]
        }
      }
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "pass":
          this.showComponents.showOtherEdit = true;
          break;
        case "preApproval":
          this.showComponents.showOperBtns = true;
          break;
        case "checking":
          break;
        case "reject":
          this.showComponents.showRejectTitle = true;
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.currentType = "preApproval";
    this.getDetailByPartnerNo();
  },
  methods: {
    a() {},
    getDetailByPartnerNo() {
      api
        .getDetailByPartnerNo({ agentPartnerNo: "" })
        .then(res => {
          // 数据解析
          const expandkey = data => {
            Object.keys(data).forEach(item => {
              if (this.$g.utils.isObj(data[item])) {
                Object.keys(data[item]).forEach(item1 => {
                  data[item1] = data[item][item1];
                  if (this.$g.utils.isObj(data[item][item1])) {
                    Object.keys(data[item][item1]).forEach(item2 => {
                      data[item2] = data[item][item1][item2];
                    });
                  }
                });
              }
            });
          };
          expandkey(res.data);
          console.log("expandKey");
          console.log(res);
          this.ruleForm = res.data;
        })
        .catch();
    },
    confirm($data) {
      console.log($data);
      api
        .agentPartnerUpdateAuditStatusOfReject({
          agentPartnerNo: "",
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
        .agentPartnerUpdateAuditStatusOfPass({
          agentPartnerNo: ""
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
