<template>
  <div>
    <div class="tab-head">
      <span class="title">商户预审核信息</span>
    </div>

    <transition name="fade">
      <div>
        <el-alert
          v-if="showComponents.showRejectTitle"
          class="detail-alert"
          :title="ruleForm.rejectReason"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
        <div>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.baseData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.merchantData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.other"></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_download" @click="onClick_download">
            <i class="el-icon-download"></i>下载资料
          </div>
          <el-button type="primary" size="normal" @click="onClick_sign">资料已检查并提交签约</el-button>
          <el-button size="normal" @click="onClick_reject">驳回</el-button>
          <!-- <div class="btn_pass" @click="onClick_sign">资料已检查并提交签约</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div> -->
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <Form
        res="rejectForm"
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
      channelAgentCode: '',
      merchantNo: '',
      channelCode: '',
      isAlrealyDownload: false,
      fromConfigData: {},
      drawer: false,
      formStatus: "",
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false,
        showOtherEdit: false
      },
      // pass通过 preApproval预审核 checking审核中 reject驳回
      currentType: "",
      ruleForm: {
        baseData: {},
        merchantData: {},
        merchantSettle: {},
        other: {}
      },
      configData: {
        baseData: {
          name: "基本信息",
          items: [
            {
              name: "商户全称",
              key: "merchantName"
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
              name: "法人身份证号",
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
              name: "支付宝账号",
              key: "alipayAccount"
            },
            {
              name: "营业执照编号",
              key: "shopLicenseNo"
            },
            {
              name: '营业执照日期',
              key: 'shopLicenseTime'
            },
            {
              name: "联系人姓名",
              key: "zfbLinkman"
            },
            {
              name: "联系人手机号",
              key: "zfbLinkmanPhone"
            }
          ]
        },
        other: {
          name: "其他",
          items: [
            {
              name: "费率",
              key: "alipayRatePecent"
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
      }
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "channelPass":
        case "channelAudit":
          this.showComponents.showOperBtns = false;
          this.showComponents.showRejectTitle = false;
          break;
        case "platformAudit":
          this.showComponents.showOperBtns = true;
          this.showComponents.showRejectTitle = false;
          break;
        case "nonOpen ":
          break;
        case "platformReject":
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
    this.channelCode = this.$route.query.channelCode
    this.channelAgentCode = this.$route.query.channelAgentCode
  },
  mounted() {
    this.getAliData()
  },
  methods: {
    getAliData() {
      api.getDetailByMerchantNo({
        merchantNo: this.merchantNo,
        channelCode: this.channelCode,
        channelAgentCode: this.channelAgentCode
      }).then(res => {
        if (res.data.merchantType === 'enterprise') {
          res.data.merchantType = '企业'
        }
        if (res.data.merchantType === 'individual') {
          res.data.merchantType = '个体工商户'
        }
        if (res.data.merchantType === 'private') {
          res.data.merchantType = '个人'
        }
        if (res.data.bankAccountType === 'public') {
          res.data.bankAccountType = '对公'
        }
        if (res.data.bankAccountType === 'private') {
          res.data.bankAccountType = '对私'
        }
        if (res.data.status === 'platformReject' || res.data.status === 'channelReject') {
          res.data.rejectReason = '驳回原因：' + res.data.rejectReason
        }
        res.data.shopLicenseTime = res.data.shopLicenseBegDate + '至' + res.data.shopLicenseEndDate
        res.data.alipayRatePecent = this.$g.utils.AccMul(res.data.alipayRate, 1000) + '‰'
        this.ruleForm = res.data;
        this.currentType = res.data.status
      }).catch();
    },
    confirm($data) {
      if (this.formStatus === "reject") {
        if (!$data.reason) {
          this.$message({
            message: '请填写驳回理由',
            type: 'warning'
          })
          return false
        }
        api.rejectDirectAudit({
          merchantNo: this.merchantNo,
          reason: $data.reason,
          channelCode: this.channelCode,
          channelAgentCode: this.channelAgentCode
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getAliData()
            this.drawer = false;
          }
        })
      }
    },
    handleEdit($ruleForm) {
      this.drawer = true;
      this.formStatus = "edit";
      this.fromConfigData = FORM_CONFIG.detailEdit;
    },
    onClick_sign() {
      if (!this.isAlrealyDownload) {
        this.$confirm("未打包下载资料，确定已提交资料到支付宝开发平台了吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          api.passDirectAudit({
            merchantNo: this.merchantNo,
            channelCode: this.channelCode,
            channelAgentCode: this.channelAgentCode
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.getAliData()
            }
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          })
        })
      } else {
        api.passDirectAudit({
          merchantNo: this.merchantNo,
          channelCode: this.channelCode,
          channelAgentCode: this.channelAgentCode
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getAliData()
          }
        })
      }
    },
    onClick_download() {
      this.isAlrealyDownload = true;
      // 然后下载操作
      api.merchantInfoDownload({
        merchantNo: this.merchantNo,
        channelCode: this.channelCode,
        channelAgentCode: this.channelAgentCode
      }).then(res => {

      }).catch();
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
  margin-bottom: 24px;
  .btn_download {
    font-size: 14px;
    font-weight: 400;
    color: #1989fa;
    line-height: 40px;
    letter-spacing: 1px;
    margin-right: 16px;
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
.table-box {
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
