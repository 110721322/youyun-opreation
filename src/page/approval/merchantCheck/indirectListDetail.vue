<template>
  <div class>
    <div class="tab_head">
      <span class="title">商户预审核信息</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <i class="dot"></i>乐刷
        </el-menu-item>
        <el-menu-item index="2">
          <i class="dot dotRed"></i>新大陆
        </el-menu-item>
        <el-menu-item index="3">
          <i class="dot dotYellow"></i>网商
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
        <div v-if="activeIndex == '1'" :key="1">
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.merchantData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.merchantSettle"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.other"></detailMode>
        </div>
        <div v-if="activeIndex == '2'" :key="2">
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData2.baseData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData2.merchantData"></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm"
            :config-data="configData2.merchantSettle"
          ></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData2.other"></detailMode>
        </div>
        <div v-if="activeIndex == '3'" :key="3">
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData3.baseData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData3.merchantData"></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm"
            :config-data="configData3.merchantSettle"
          ></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData3.other"></detailMode>
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
      fromConfigData: {},
      drawer: false,
      activeIndex: "2",
      rejectTitle: "驳回原因：商户名称与营业执照不符合",
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false
      },
      channelCode: "1",
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
              key: "wechatAlipayRate"
            },
            {
              name: "云闪付费率（单笔≤1000元)",
              key: "cloudPayGt1000Rate"
            },
            {
              name: "云闪付费率（单笔＞1000元)",
              key: "cloudPayLt1000Rate"
            },
            {
              name: "邮箱",
              key: "email"
            }
          ]
        }
      },
      configData2: {
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
              key: "wechatAlipayRate"
            },
            {
              name: "云闪付费率（单笔≤1000元)",
              key: "cloudPayGt1000Rate"
            },
            {
              name: "云闪付费率（单笔＞1000元)",
              key: "cloudPayLt1000Rate"
            },
            {
              name: "邮箱",
              key: "email"
            }
          ]
        }
      },
      configData3: {
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
              key: "wechatAlipayRate"
            },
            {
              name: "云闪付费率（单笔≤1000元)",
              key: "cloudPayGt1000Rate"
            },
            {
              name: "云闪付费率（单笔＞1000元)",
              key: "cloudPayLt1000Rate"
            },
            {
              name: "邮箱",
              key: "email"
            }
          ]
        }
      },
      testData: [
        {
          id: 0,
          type: "设备品牌",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          amount: "222.22",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          reason: "银行卡账号错误，服务商无法联系",
          edit: false
        },
        {
          id: 1,
          type: "设备型号",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          amount: "222.22",
          reason: "银行卡账号错误，服务商无法联系",
          edit: false
        }
      ]
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "approval":
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
    this.currentType = "approval";
    this.getDetailByMerchantNo();
  },
  methods: {
    getDetailByMerchantNo() {
      api
        .getDetailByMerchantNo({ merchantNo: "", channelCode: "" })
        .then(res => {
          console.log(res);
          this.ruleForm = res.data;
        })
        .catch();
    },
    onClick_pass() {
      api
        .merchantUpdateAuditStatusOfPass({
          merchantNo: "",
          channelCode: this.channelCode
        })
        .then(res => {
          this.$message("已通过");
        })
        .catch(err => {
          this.$message(err);
        });
    },
    confirm($data) {
      console.log($data);
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
    getTableData() {
      this.testData = [
        {
          id: 0,
          type: "设备品牌",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          amount: "222.22",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          reason: "银行卡账号错误，服务商无法联系"
        },
        {
          id: 1,
          type: "设备型号",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          amount: "222.22",
          reason: "银行卡账号错误，服务商无法联系"
        }
      ];
    },
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
