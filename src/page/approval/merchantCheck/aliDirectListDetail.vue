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
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.merchantData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.merchantSettle"></detailMode>
          <detailMode
            :is-show-edit-btn="showComponents.showOtherEdit"
            :img-width="4"
            :rule-form="ruleForm"
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
import { FORM_CONFIG } from "./../formConfig/aliDirectListConfig";

export default {
  name: "AliDirectListDetail",
  components: { detailMode, Form },

  data() {
    return {
      isAlrealyDownload: false,
      fromConfigData: {},
      drawer: false,
      rejectTitle: "驳回原因：商户名称与营业执照不符合",
      formStatus: "",
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
              name: "费率",
              key: "rate"
            },
            {
              name: "邮箱",
              key: "email"
            },
            {
              name: "APPID",
              key: "appId"
            },
            {
              name: "PID",
              key: "pid"
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
    confirm($data) {
      console.log($data);
      if (this.formStatus === "reject") {
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
      }
      if (this.formStatus === "edit") {
        api
          .updateOthersInfo({
            merchantNo: $data["merchantNo"],
            channelCode: $data["channelCode"],
            rate: $data["rate"],
            appid: $data["appid"],
            pid: $data["pid"]
          })
          .then(res => {
            this.$message("已修改");
            this.drawer = false;
          })
          .catch(err => {
            this.$message(err);
          });
      }
    },
    handleEdit($ruleForm) {
      console.log($ruleForm);
      this.drawer = true;
      this.formStatus = "edit";
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
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
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
      }
    },
    onClick_download() {
      this.isAlrealyDownload = true;
      // 然后下载操作
      api
        .getDownloadUrl({ merchantNo: "", channelCode: "" })
        .then(res => {
          window.open(res.object);
        })
        .catch();
    },
    cancel() {
      this.drawer = false;
    },
    onClick_reject() {
      this.drawer = true;
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
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
