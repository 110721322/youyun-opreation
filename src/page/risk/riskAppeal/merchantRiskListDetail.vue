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
        <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.appealData"></detailMode>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_sign">资料已检查，通过</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div>
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
        @cancel="cancel"
        @confirm="confirm"
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
      phone: "13123465748",
      // pass通过 preApproval预审核 checking审核中 reject驳回
      currentType: "",
      ruleForm: {},
      configData: {
        baseData: {
          name: "基本信息",
          items: [
            {
              name: "商户名称",
              key: "merchantName"
            },
            {
              name: "营业执照编号",
              key: "shopLicenseNo"
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
              key: "idCardNo"
            },
            {
              name: '银行卡号',
              key: 'bankCardNo'
            },
            {
              name: '商户地址',
              key: 'merchantAddress'
            }
          ]
        },
        appealData: {
          name: "商户信息",
          items: [
            {
              name: "法人手持营业执照",
              key: "shopLicenseImg",
              type: "image"
            },
            {
              name: "法人手持身份证正面",
              key: "idCardHandImg",
              type: "image"
            },
            {
              name: "法人身份证原件正面",
              key: "idCardPortraitImg",
              type: "image"
            },
            {
              name: "手持银行卡原件正面",
              key: "bankCardImg",
              type: "image"
            },
            {
              name: "商户门店照片",
              key: "shopFaceImg",
              type: "image"
            },
            {
              name: "其他照片",
              key: "otherImg",
              type: "image"
            },
            {
              name: "商户机打指定小票照片1",
              key: "machineTicketImg1",
              type: "image"
            },
            {
              name: "商户机打指定小票照片2",
              key: "machineTicketImg2",
              type: "image"
            },
            {
              name: "商户机打指定小票照片3",
              key: "machineTicketImg3",
              type: "image"
            },
            {
              name: "视频",
              key: "video",
              type: "video"
            }
          ]
        }
      },
      testData: []
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
    confirm($data) {
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
          } else {
            this.$message({
              message: res.errorMessage,
              type: 'info'
            });
          }
        }).catch(err => {
          this.$message({
            message: err.errorMessage,
            type: 'info'
          });
        });
      }
    },
    getDetail() {
      api.appealGetData({
        id: this.id
      }).then(res => {
        console.log(res)
        this.ruleForm = res.object;
        this.currentType = res.object.status
      }).catch(err => {
        this.$message(err);
      });
    },
    handleEdit($ruleForm) {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.detailEdit;
    },
    onClick_sign() {
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
          } else {
            this.$message({
              message: res.errorMessage,
              type: 'success'
            })
          }
        }).catch(err => {
          this.$message({
            message: err.errorMessage,
            type: 'info'
          });
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },
    cancel() {
      this.drawer = false;
    },
    onClick_reject() {
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
.detail-alert {
  margin: 24px;
  padding: 9px 24px;
  background-color: #ffe8e9;
  border: 1px solid #ff7f85;
  color: #f5222d;
  width: auto;
}
</style>
