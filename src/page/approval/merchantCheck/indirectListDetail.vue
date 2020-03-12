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
          <detailMode
            :img-width="4"
            :rule-form="ruleForm.baseData"
            :config-data="configData.baseData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm.merchantData"
            :config-data="configData.merchantData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm.merchantSettle"
            :config-data="configData.merchantSettle"
          ></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm.other" :config-data="configData.other"></detailMode>
        </div>
        <div v-if="activeIndex == '2'" :key="2">
          <detailMode
            :img-width="4"
            :rule-form="ruleForm2.baseData"
            :config-data="configData2.baseData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm2.merchantData"
            :config-data="configData2.merchantData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm2.merchantSettle"
            :config-data="configData2.merchantSettle"
          ></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm2.other" :config-data="configData2.other"></detailMode>
        </div>
        <div v-if="activeIndex == '3'" :key="3">
          <detailMode
            :img-width="4"
            :rule-form="ruleForm3.baseData"
            :config-data="configData3.baseData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm3.merchantData"
            :config-data="configData3.merchantData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm3.merchantSettle"
            :config-data="configData3.merchantSettle"
          ></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm3.other" :config-data="configData3.other"></detailMode>
        </div>
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
      // approval通过 checking审核中 reject驳回
      currentType: "",
      ruleForm: {
        baseData: {
          merName: "329438980213098094",
          address: "浙江省杭州市西湖区黄姑山路工专路交叉路口",
          kind: "餐饮类",
          peopleName: "金柒柒",
          phone: "18409098920",
          idCard: "3310281995009208899"
        },
        merchantData: {
          kind: "企业",
          name: "山东紫菜",
          startTime: "2019-03-10",
          number: "3428947394238",
          phone: "18503892300",
          endTime: "2019-03-10",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic2:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic3:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic4:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic5:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic6:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        },
        merchantSettle: {
          type: "对公",
          cardId: "622023204284902384320984",
          address: "浙江省 杭州市 西湖区",
          bank: "招商银行股份有限公司杭州保交支行",
          phone: "15820908766   ",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        },
        other: {
          aliwxPerc: "2.8 ‰",
          yunLessPerc: "2.8 ‰",
          yunMorePerc: "5.6 ‰",
          email: "3133427948@sina.com"
        }
      },
      ruleForm2: {
        baseData: {
          merName: "329438980213098094",
          address: "浙江省杭州市西湖区黄姑山路工专路交叉路口",
          kind: "餐饮类",
          peopleName: "金柒柒",
          phone: "18409098920",
          idCard: "3310281995009208899"
        },
        merchantData: {
          kind: "企业",
          name: "山东紫菜",
          startTime: "2019-03-10",
          number: "3428947394238",
          phone: "18503892300",
          endTime: "2019-03-10",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic2:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic3:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic4:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic5:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic6:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        },
        merchantSettle: {
          type: "对公",
          cardId: "622023204284902384320984",
          address: "浙江省 杭州市 西湖区",
          bank: "招商银行股份有限公司杭州保交支行",
          phone: "15820908766   ",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        },
        other: {
          aliwxPerc: "2.8 ‰",
          yunLessPerc: "2.8 ‰",
          yunMorePerc: "5.6 ‰",
          email: "3133427948@sina.com"
        }
      },
      ruleForm3: {
        baseData: {
          merName: "329438980213098094",
          address: "浙江省杭州市西湖区黄姑山路工专路交叉路口",
          kind: "餐饮类",
          peopleName: "金柒柒",
          phone: "18409098920",
          idCard: "3310281995009208899"
        },
        merchantData: {
          kind: "企业",
          name: "山东紫菜",
          startTime: "2019-03-10",
          number: "3428947394238",
          phone: "18503892300",
          endTime: "2019-03-10",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic2:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic3:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic4:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic5:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic6:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        },
        merchantSettle: {
          type: "对公",
          cardId: "622023204284902384320984",
          address: "浙江省 杭州市 西湖区",
          bank: "招商银行股份有限公司杭州保交支行",
          phone: "15820908766   ",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        },
        other: {
          aliwxPerc: "2.8 ‰",
          yunLessPerc: "2.8 ‰",
          yunMorePerc: "5.6 ‰",
          email: "3133427948@sina.com"
        }
      },
      configData: {
        baseData: {
          name: "基本信息",
          items: [
            {
              name: "商户全称",
              key: "merName"
            },
            {
              name: "公司地址",
              key: "address"
            },
            {
              name: "经营类目",
              key: "kind"
            },
            {
              name: "法人姓名",
              key: "peopleName"
            },

            {
              name: "法人手机号",
              key: "phone"
            },
            {
              name: "法人身份证",
              key: "idCard"
            }
          ]
        },
        merchantData: {
          name: "商户信息",
          items: [
            {
              name: "营业执照",
              key: "pic",
              type: "image"
            },
            {
              name: "门头照",
              key: "pic2",
              type: "image"
            },
            {
              name: "内景照",
              key: "pic3",
              type: "image"
            },
            {
              name: "收银台照",
              key: "pic4",
              type: "image"
            },
            {
              name: "法人身份证正面",
              key: "pic5",
              type: "image"
            },
            {
              name: "结算人身份证反面",
              key: "pic6",
              type: "image"
            },
            {
              name: "商户类型",
              key: "kind"
            },
            {
              name: "商户简称",
              key: "name"
            },
            {
              name: "营业执照开始日期",
              key: "startTime"
            },
            {
              name: "营业执照编号",
              key: "number"
            },
            {
              name: "客服手机号",
              key: "phone"
            },
            {
              name: "法人身份证到期日",
              key: "endTime"
            }
          ]
        },
        merchantSettle: {
          name: "商户结算卡",
          items: [
            {
              name: "营业执照",
              key: "pic",
              type: "image"
            },
            {
              name: "结算卡类型",
              key: "type"
            },
            {
              name: "银行卡号",
              key: "cardId"
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
        other: {
          name: "其他",
          items: [
            {
              name: "支付宝/微信费率",
              key: "aliwxPerc"
            },
            {
              name: "云闪付费率（单笔≤1000元)",
              key: "yunLessPerc"
            },
            {
              name: "云闪付费率（单笔＞1000元)",
              key: "yunMorePerc"
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
              key: "merName"
            },
            {
              name: "公司地址",
              key: "address"
            },
            {
              name: "经营类目",
              key: "kind"
            },
            {
              name: "法人姓名",
              key: "peopleName"
            },

            {
              name: "法人手机号",
              key: "phone"
            },
            {
              name: "法人身份证",
              key: "idCard"
            }
          ]
        },
        merchantData: {
          name: "商户信息",
          items: [
            {
              name: "营业执照",
              key: "pic",
              type: "image"
            },
            {
              name: "门头照",
              key: "pic2",
              type: "image"
            },
            {
              name: "内景照",
              key: "pic3",
              type: "image"
            },
            {
              name: "收银台照",
              key: "pic4",
              type: "image"
            },
            {
              name: "法人身份证正面",
              key: "pic5",
              type: "image"
            },
            {
              name: "结算人身份证反面",
              key: "pic6",
              type: "image"
            },
            {
              name: "商户类型",
              key: "kind"
            },
            {
              name: "商户简称",
              key: "name"
            },
            {
              name: "营业执照开始日期",
              key: "startTime"
            },
            {
              name: "营业执照编号",
              key: "number"
            },
            {
              name: "客服手机号",
              key: "phone"
            },
            {
              name: "法人身份证到期日",
              key: "endTime"
            }
          ]
        },
        merchantSettle: {
          name: "商户结算卡",
          items: [
            {
              name: "营业执照",
              key: "pic",
              type: "image"
            },
            {
              name: "结算卡类型",
              key: "type"
            },
            {
              name: "银行卡号",
              key: "cardId"
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
        other: {
          name: "其他",
          items: [
            {
              name: "支付宝/微信费率",
              key: "aliwxPerc"
            },
            {
              name: "云闪付费率（单笔≤1000元)",
              key: "yunLessPerc"
            },
            {
              name: "云闪付费率（单笔＞1000元)",
              key: "yunMorePerc"
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
              key: "merName"
            },
            {
              name: "公司地址",
              key: "address"
            },
            {
              name: "经营类目",
              key: "kind"
            },
            {
              name: "法人姓名",
              key: "peopleName"
            },

            {
              name: "法人手机号",
              key: "phone"
            },
            {
              name: "法人身份证",
              key: "idCard"
            }
          ]
        },
        merchantData: {
          name: "商户信息",
          items: [
            {
              name: "营业执照",
              key: "pic",
              type: "image"
            },
            {
              name: "门头照",
              key: "pic2",
              type: "image"
            },
            {
              name: "内景照",
              key: "pic3",
              type: "image"
            },
            {
              name: "收银台照",
              key: "pic4",
              type: "image"
            },
            {
              name: "法人身份证正面",
              key: "pic5",
              type: "image"
            },
            {
              name: "结算人身份证反面",
              key: "pic6",
              type: "image"
            },
            {
              name: "商户类型",
              key: "kind"
            },
            {
              name: "商户简称",
              key: "name"
            },
            {
              name: "营业执照开始日期",
              key: "startTime"
            },
            {
              name: "营业执照编号",
              key: "number"
            },
            {
              name: "客服手机号",
              key: "phone"
            },
            {
              name: "法人身份证到期日",
              key: "endTime"
            }
          ]
        },
        merchantSettle: {
          name: "商户结算卡",
          items: [
            {
              name: "营业执照",
              key: "pic",
              type: "image"
            },
            {
              name: "结算卡类型",
              key: "type"
            },
            {
              name: "银行卡号",
              key: "cardId"
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
        other: {
          name: "其他",
          items: [
            {
              name: "支付宝/微信费率",
              key: "aliwxPerc"
            },
            {
              name: "云闪付费率（单笔≤1000元)",
              key: "yunLessPerc"
            },
            {
              name: "云闪付费率（单笔＞1000元)",
              key: "yunMorePerc"
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
    handleSelect($index) {
      this.activeIndex = $index;
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
