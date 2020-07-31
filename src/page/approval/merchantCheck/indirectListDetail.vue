<template>
  <div class v-if="channelStatusList.length > 0">
    <div class="tab_head">
      <span class="title">商户预审核信息</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item, index) in channelStatusList" :index="index" :key="index">
          <i class="dot" v-if="item.channelCode === 'leShua'"></i>
          <i class="dot dotRed" v-if="item.channelCode === 'newLand'"></i>
          {{item.channel}}
        </el-menu-item>
      </el-menu>
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
        <div v-if="activeIndex" :key="activeIndex">
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.merchantData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.merchantSettle"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.other"></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_pass">资料已检查并提交签约</div>
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
  name: "IndirectListDetail",
  components: { detailMode, Form },

  data() {
    return {
      index: 0,
      merchantNo: '',
      channelStatusList: [],
      channelAgentCode: '',
      fromConfigData: {},
      drawer: false,
      activeIndex: "1",
      rejectTitle: "",
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false
      },
      channelCode: "",
      // approval通过 checking审核中 reject驳回
      currentType: "",
      ruleForm: {},
      configData: {
        baseData: {
          name: "基本信息",
          items: [
            {
              name: "商户全称",
              key: "fullName"
            },
            {
              name: "公司地址",
              key: "address"
            },
            {
              name: "经营类目",
              key: "category"
            },
            {
              name: "法人姓名",
              key: "lawPerson"
            },

            {
              name: "法人手机号",
              key: "lawMobile"
            },
            {
              name: "法人身份证",
              key: "lawIdCard"
            }
          ]
        },
        merchantData: {
          name: "商户信息",
          items: [
            {
              name: "营业执照",
              key: "shopLicenseImg",
              type: "image"
            },
            {
              name: "门头照",
              key: "shopFaceImg",
              type: "image"
            },
            {
              name: "内景照",
              key: "shopInnerImg",
              type: "image"
            },
            {
              name: "收银台照",
              key: "shopCashdeskImg",
              type: "image"
            },
            {
              name: "法人身份证正面",
              key: "idCardPortraitImg",
              type: "image"
            },
            {
              name: "结算人身份证反面",
              key: "idCardEmblemImg",
              type: "image"
            },
            {
              name: "商户类型",
              key: "merchantType"
            },
            {
              name: "商户简称",
              key: "shortName"
            },
            {
              name: "营业执照开始日期",
              key: "shopLicenseBegDate"
            },
            {
              name: "营业执照编号",
              key: "shopLicenseNo"
            },
            {
              name: "客服手机号",
              key: "serviceTel"
            },
            {
              name: "法人身份证到期日",
              key: "idCardExpireDate"
            }
          ]
        },
        merchantSettle: {
          name: "商户结算卡",
          items: [
            {
              name: "营业执照",
              key: "shopLicenseImg",
              type: "image"
            },
            {
              name: "结算卡类型",
              key: "accountType"
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
              key: "branchName"
            },
            {
              name: "银行预留手机号",
              key: "bankMobile"
            }
          ]
        },
        other: {
          name: "其他",
          items: [
            {
              name: "支付宝/微信费率",
              key: "alipayRate"
            },
            {
              name: "云闪付费率（单笔≤1000元)",
              key: "cloudPayGt1000Rate"
            },
            {
              name: "云闪付费率（单笔＞1000元)",
              key: "cloudPayLe1000Rate"
            },
            {
              name: "邮箱",
              key: "email"
            }
          ]
        }
      }
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "channelPass":
          this.showComponents.showOperBtns = false;
          this.showComponents.showRejectTitle = false;
          break;
        case "platformAudit":
          this.showComponents.showOperBtns = true;
          this.showComponents.showRejectTitle = false;
          break;
        case "nonOpen ":
          break;
        case "channelAudit":
          this.showComponents.showOperBtns = false;
          this.showComponents.showRejectTitle = false;
          break;
        case "platformReject":
          this.showComponents.showOperBtns = false;
          this.showComponents.showRejectTitle = true;
          break;
        case "channelReject":
          this.showComponents.showOperBtns = false;
          this.showComponents.showRejectTitle = true;
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.merchantNo = this.$route.query.merchantNo
    this.channelStatusList = this.$route.query.channelStatusList
    if (this.channelStatusList) {
      this.getDetail()
    }
  },
  mounted() {},
  methods: {
    getDetail() {
      api.getChannelDetailByNo({
        merchantNo: this.merchantNo,
        channelCode: this.channelStatusList[this.activeIndex - 1].channelCode,
        channelAgentCode: this.channelStatusList[this.activeIndex - 1].channelAgentCode
      }).then(res => {
        if (res.object.merchantType === 'personal') {
          res.object.merchantType = '个人'
        }
        if (res.object.merchantType === 'enterprise') {
          res.object.merchantType = '企业'
        }
        if (res.object.merchantType === 'individual') {
          res.object.merchantType = '个体工商户'
        }
        if (res.object.bankAccountType === 'public') {
          res.object.accountType = '对公'
        }
        if (res.object.bankAccountType === 'private') {
          res.object.accountType = '对私'
        }
        this.ruleForm = res.object
        this.currentType = res.object.status
      })
    },
    onClick_pass() {
      this.$confirm("确定资料已检查完毕?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.passIndirectAudit({
          merchantNo: this.merchantNo,
          channelCode: this.channelStatusList[this.activeIndex - 1].channelCode,
          channelAgentCode: this.channelStatusList[this.activeIndex - 1].channelAgentCode
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已通过',
              type: 'success'
            })
            this.getDetail()
          }
        }).catch(err => {
          this.$message({
            message: err.errorMessage,
            type: 'warning'
          });
        });
      }).catch(() => {
        this.$message({
          message: '取消操作',
          type: 'info'
        });
      })
    },
    confirm($data) {
      console.log($data);
      if (!$data.reason) {
        this.$message({
          message: '请填写拒绝理由',
          type: 'warning'
        })
        return false
      } else {
        api.rejectIndirectAudit({
          merchantNo: this.merchantNo,
          channelCode: this.channelStatusList[this.activeIndex - 1].channelCode,
          channelAgentCode: this.channelStatusList[this.activeIndex - 1].channelAgentCode
        }).then(res => {
          console.log(res)
          if (res.status === 0) {
            this.$message({
              message: '已驳回',
              type: 'success'
            })
            this.getDetail()
          }
        })
      }
      api
        .merchantUpdateAuditStatusOfReject({
          merchantNo: "",
          reason: $data["reason"],
          channelCode: this.channelCode
        })
        .then(res => {
          this.$message("已驳回");
          this.drawer = false;
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
    getTableData() {},
    handleSelect($index) {
      this.activeIndex = $index;
      this.channelCode = $index;
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
