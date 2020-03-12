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
        <detailMode
          :img-width="4"
          :rule-form="ruleForm.beforeData"
          :config-data="configData.beforeData"
        ></detailMode>
        <detailMode
          :img-width="4"
          :rule-form="ruleForm.afterData"
          :config-data="configData.afterData"
        ></detailMode>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass">资料已检查并提交签约</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import detailMode from "@/components/detailMode/detailMode2.vue";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./../formConfig/indirectDetailConfig";

export default {
  name: "SettlementListDetail",
  components: { detailMode, Form },

  data() {
    return {
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
        beforeData: {
          type: "对私-非法人",
          name: "金柒柒",
          idcard: "3302840184013840149847",
          bankid: "2430124230482394802",
          address: "浙江省 杭州市 西湖区",
          bank: "招商银行股份有限公司杭州保交支行",
          phone: "15820908766",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic2:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic3:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic4:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        },
        afterData: {
          type: "对私-非法人",
          name: "金柒柒",
          idcard: "3302840184013840149847",
          bankid: "2430124230482394802",
          address: "浙江省 杭州市 西湖区",
          bank: "招商银行股份有限公司杭州保交支行",
          phone: "15820908766",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic2:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic3:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic4:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        }
      },
      configData: {
        beforeData: {
          name: "修改前信息",
          items: [
            {
              name: "结算人银行卡",
              key: "pic",
              type: "image"
            },
            {
              name: "结算人身份证正面",
              key: "pic2",
              type: "image"
            },
            {
              name: "结算人身份证反面",
              key: "pic3",
              type: "image"
            },
            {
              name: "非法人授权书",
              key: "pic4",
              type: "image"
            },
            {
              name: "结算卡类型",
              key: "type"
            },
            {
              name: "开户名：",
              key: "name"
            },
            {
              name: "结算人身份证号",
              key: "idcard"
            },
            {
              name: "银行卡号",
              key: "bankid"
            },

            {
              name: "开户支行地区",
              key: "address"
            },
            {
              name: "开户支行",
              key: "bank"
            },
            {
              name: "银行预留手机号",
              key: "phone"
            }
          ]
        },
        afterData: {
          name: "修改后信息",
          items: [
            {
              name: "结算人银行卡",
              key: "pic",
              type: "image"
            },
            {
              name: "结算人身份证正面",
              key: "pic2",
              type: "image"
            },
            {
              name: "结算人身份证反面",
              key: "pic3",
              type: "image"
            },
            {
              name: "非法人授权书",
              key: "pic4",
              type: "image"
            },
            {
              name: "结算卡类型",
              key: "type"
            },
            {
              name: "开户名",
              key: "name"
            },
            {
              name: "结算人身份证号",
              key: "idcard"
            },
            {
              name: "银行卡号",
              key: "bankid"
            },

            {
              name: "开户支行地区",
              key: "address",
              hasIconTime: true
            },
            {
              name: "开户支行",
              key: "bank"
            },
            {
              name: "银行预留手机号",
              key: "phone"
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
          this.$set(this.showComponents, "showOperBtns", true);
          this.$set(this.showComponents, "showRejectTitle", false);
          break;
        case "checking":
          break;
        case "reject":
          this.$set(this.showComponents, "showOperBtns", false);
          this.$set(this.showComponents, "showRejectTitle", true);
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.currentType = "approval";
  },
  methods: {
    cancel(done) {
      done();
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
}
</style>
