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
          <detailMode
            :is-show-edit-btn="showComponents.showOtherEdit"
            :img-width="4"
            :rule-form="ruleForm.other"
            :config-data="configData.other"
            @edit="handleEdit"
          ></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_download" @click="onClick_download">
            <i class="el-icon-download"></i>下载资料
          </div>
          <div class="btn_pass" @click="onClick_sign">资料已检查并提交签约</div>
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
        label-width="130px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import detailMode from "@/components/detailMode/detailMode2.vue";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./../formConfig/wxDirectListConfig";

export default {
  name: "WxDirectListDetail",
  components: { detailMode, Form },

  data() {
    return {
      isAlrealyDownload: false,
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
          perc: "2.8 ‰",
          appid: "2.8 ‰",
          pid: "5.6 ‰",
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
              name: "费率",
              key: "perc"
            },
            {
              name: "邮箱",
              key: "email"
            },
            {
              name: "APPID",
              key: "appid"
            },
            {
              name: "PID",
              key: "pid"
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
    this.currentType = "pass";
  },
  methods: {
    handleEdit($ruleForm) {
      console.log($ruleForm);
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.detailEdit;
    },
    onClick_sign() {
      if (!this.isAlrealyDownload) {
        this.$confirm(
          "未打包下载资料，确定已提交资料到支付宝开发平台了吗?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    onClick_download() {
      this.isAlrealyDownload = true;
      // 然后下载操作
    },
    cancel(done) {
      done();
    },
    onClick_reject() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.rejectData;
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
