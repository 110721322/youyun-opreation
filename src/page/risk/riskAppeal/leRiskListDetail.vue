<template>
  <div>
    <div class="tab-head">
      <span class="title">乐刷风控详情</span>
    </div>

    <transition name="fade">
      <div>
        <detailMode
          :img-width="4"
          :rule-form="ruleForm"
          :config-data="configData.baseData"
          :current-type="currentType"
        >
          <template v-slot="{ currentType }">
            <div class="current-type">
              <template v-if="currentType === 'pass' || currentType === 'channelPass'">
                <img :src="passImg" alt="已通过图片" />
              </template>
              <template v-if="currentType === 'channelAudit' || currentType === 'platformAudit' || currentType === 'waitChannelAudit'">
                <img :src="approvalImg" alt="审核中图片" />
              </template>
              <template v-if="currentType === 'reject' || currentType === 'channelReject' || currentType === 'platformReject' || currentType === 'preAuditReject'">
                <img :src="refuseImg" alt="已拒绝图片" />
              </template>
            </div>
          </template>
        </detailMode>
        <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.appealData"></detailMode>
        <div class="table-box">
          <div class="title">审核记录</div>
          <div v-for="(item,index) in appealData" :key="index" class="item">
            <div class="time">{{ item.createTime }}</div>
            <div class="channel">{{ item.operationName }}</div>
            <div v-if="item.auditStatus === 'pass'" class="status">
              <span class="dot" :class="item.dotName"></span>
              通过
            </div>
            <div v-if="item.auditStatus === 'reject'" class="status">
              <span class="dot reject" :class="item.dotName"></span>
              驳回
            </div>
            <div v-if="item.auditStatus === 'channelAudit'" class="status">
              <span class="dot unused" :class="item.dotName"></span>
              通道审核中
            </div>
            <div v-if="item.auditStatus === 'channelPass'" class="status">
              <span class="dot" :class="item.dotName"></span>
              通道通过
            </div>
            <div v-if="item.auditStatus === 'channelReject'" class="status">
              <span class="dot reject" :class="item.dotName"></span>
              通道驳回
            </div>
            <div v-if="item.auditStatus === 'nonOpen'" class="status">
              <span class="dot review" :class="item.dotName"></span>
              待开通
            </div>
            <div v-if="item.auditStatus === 'platformAudit'" class="status">
              <span class="dot unused" :class="item.dotName"></span>
              平台审核中
            </div>
            <div v-if="item.auditStatus === 'platformReject'" class="status">
              <span class="dot reject" :class="item.dotName"></span>
              平台驳回
            </div>
            <div class="reason">{{ item.reason?'原因：' + item.reason:"" }}</div>
          </div>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn-download" @click="clickDownload">
            <i class="el-icon-download"></i>打包下载
          </div>
          <div class="btn-pass" @click="clickSign">资料已全部检查并提交申诉</div>
          <div class="btn-reject" @click="clickReject">驳回</div>
        </div>
        <div v-if="showComponents.showDownload" class="btn-box">
          <div class="btn-download" @click="clickDownload">
            <i class="el-icon-download"></i>打包下载
          </div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        :foot-btn-label="'确定'"
        label-width="130px"
        @cancel="onClickCancel"
        @confirm="onClickConfirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import * as g from '@/libs/global';
import api from "@/api/api_risk";
import zipApi from "@/api/api_common";
import passImg from "@/assets/img/pass.png";
import refuseImg from "@/assets/img/refuse.png";
import approvalImg from "@/assets/img/approval.png";
import detailMode from "@/components/detailMode/detailMode2.vue";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "../formConfig/leRiskListDetailConfig";

export default {
  name: "LeRiskListDetail",
  components: { detailMode, Form },

  data() {
    return {
      id: '',
      passImg: passImg,
      refuseImg: refuseImg,
      approvalImg: approvalImg,
      fromConfigData: {},
      drawer: false,
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false,
        showDownload: false
      },
      // pass通过 preApproval预审核 checking审核中 reject驳回
      currentType: "",
      ruleForm: {},
      configData: {
        baseData: {
          name: "基本信息",
          items: [
            {
              name: "商户ID",
              key: "merchantNo"
            },
            {
              name: "商户名称",
              key: "merchantName"
            },
            {
              name: "乐刷商户号",
              key: "channelMerchantNo"
            },
            {
              name: "所属服务商ID",
              key: "agentNo"
            },

            {
              name: "所属服务商名称",
              key: "agentName"
            },
            {
              name: "商户经营情况",
              key: "remark"
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
            // {
            //   name: "商户机打指定小票照片1",
            //   key: "machineTicketImg1",
            //   type: "image"
            // },
            // {
            //   name: "商户机打指定小票照片2",
            //   key: "machineTicketImg2",
            //   type: "image"
            // },
            // {
            //   name: "商户机打指定小票照片3",
            //   key: "machineTicketImg3",
            //   type: "image"
            // },
            {
              name: "视频",
              key: "video",
              type: "video"
            }
          ]
        }
      },
      testData: [],
      appealData: []
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "channelAudit":
          this.$set(this.showComponents, "showDownload", true);
          this.$set(this.showComponents, "showRejectTitle", false);
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "channelPass":
          this.$set(this.showComponents, "showDownload", true);
          this.$set(this.showComponents, "showRejectTitle", false);
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "channelReject":
          this.$set(this.showComponents, "showDownload", true);
          this.$set(this.showComponents, "showRejectTitle", true);
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "preAuditReject":
          this.$set(this.showComponents, "showDownload", true);
          this.$set(this.showComponents, "showRejectTitle", true);
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "pass":
          this.$set(this.showComponents, "showDownload", true);
          this.$set(this.showComponents, "showRejectTitle", false);
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "waitChannelAudit":
          this.$set(this.showComponents, "showDownload", true);
          this.$set(this.showComponents, "showRejectTitle", false);
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "reject":
          this.$set(this.showComponents, "showDownload", true);
          this.$set(this.showComponents, "showRejectTitle", true);
          this.$set(this.showComponents, "showOperBtns", false);
          break;
        case "waitPreAudit":
          this.$set(this.showComponents, "showDownload", false);
          this.$set(this.showComponents, "showRejectTitle", false);
          this.$set(this.showComponents, "showOperBtns", true);
          break;

        default:
          break;
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
    this.getRecord();
  },
  mounted() {
  },
  methods: {
    getDetail() {
      api.appealGetData({
        id: this.id
      }).then(res => {
        this.ruleForm = res.data;
        this.currentType = res.data.status
      })
    },
    getRecord() {
      api.queryByCondition({
        banAppealId: this.id
      }).then(res => {
        this.appealData = res.data;
      })
    },

    onClickConfirm($data) {
      if (!$data.reason) {
        this.$message({
          message: '请填写驳回理由',
          type: 'warning'
        })
        return false
      } else {
        api.updateOfPreReject({
          id: this.id,
          reason: $data.reason
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已驳回',
              type: 'success'
            })
            this.getDetail()
            this.getRecord()
            this.drawer = false
          }
        })
      }
    },

    clickSign() {
      api.updateOfPrePass({
        id: this.id
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '已通过',
            type: 'success'
          })
          this.getRecord()
          this.getDetail()
        }
      })
    },

    clickDownload() {
      api.getDownloadUrl({
        id: this.id
      }).then(res => {
        const key = res.data.taskKey
        this.getZip(key)
      })
    },

    getZip(key) {
      zipApi.zipTask({
        key: key
      }).then(res => {
        window.location.href = g.config.server + `/common/v1/progress/result?key=${key}`;
      })
    },

    onClickCancel() {
      this.drawer = false;
    },

    clickReject() {
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
  margin-bottom: 50px;
  text-align: center;

  .btn-download {
    font-size: 14px;
    font-weight: 400;
    color: #1989fa;
    line-height: 40px;
    letter-spacing: 1px;
  }

  .btn-pass {
    margin-left: 60px;
    width: 205px;
    height: 40px;
    background: #1989fa;
    border-radius: 4px;
    line-height: 40px;
    color: #fff;
  }

  .btn-reject {
    margin-left: 24px;
    width: 113px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(199, 200, 205, 1);
    line-height: 40px;
    color: #606266;
  }
}
.table-box {
  position: relative;
  margin: 24px;
  padding-bottom: 80px;
  overflow: hidden;
  background: #fff;

  .title {
    padding-left: 24px;
    line-height: 64px;
    border-bottom: 1px solid #ebeef5;
    font-size: 16px;
    color: #333335;
  }

  .item {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    line-height: 72px;
    border-bottom: 1px solid #ebeef5;

    .time {
      width: 25%;
      color: #606266;
    }

    .channel {
      width: 25%;
      color: #606266;
    }

    .status {
      width: 25%;
      color: #979797;
    }

    .reason {
      width: 25%;
      color: #f5222d;
    }
  }
}

.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #52c41a;
  vertical-align: middle;
  margin: 0 5px;

  &.opened {
    background-color: #52c41a;
  }

  &.review {
    background-color: #ffc620;
  }

  &.reject {
    background-color: #f5222d;
  }

  &.unused {
    background-color: #9c9c9c;
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
