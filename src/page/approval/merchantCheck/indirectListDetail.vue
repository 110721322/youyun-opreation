<template>
  <div>
    <template v-if="channelStatusList.length > 0">
      <div class="tab_top">
        <span class="title">商户预审核信息</span>
        <el-alert
          v-if="greyListData"
          class="detail-alert"
          :title="'入件灰名单信息:' + greyListData"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
        <el-menu
          :default-active="activeIndex"
          class="el-menu"
          mode="horizontal"
        >
          <el-menu-item v-for="(item, index) in channelStatusList" :key="index" :index="`${index+1}`">
            <i :class="auditClassName"></i>
            {{ item.channel }}
          </el-menu-item>
        </el-menu>
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
          <div v-if="activeIndex" :key="activeIndex">
            <detailMode
              :img-width="4"
              :rule-form="ruleForm"
              :config-data="configData.baseData"
            ></detailMode>
            <!--            商户类型：企业，个体工商户-->
            <detailMode
              v-if="ruleForm.merchantType !== 'personal'"
              :img-width="4"
              :rule-form="ruleForm"
              :config-data="configData.merchantData"
            ></detailMode>
            <!--            商户类型：个人-->
            <detailMode
              v-if="ruleForm.merchantType === 'personal'"
              :img-width="4"
              :rule-form="ruleForm"
              :config-data="configData.merchantData1"
            ></detailMode>
            <!--          (企业，个体工商户)对公法人-->
            <detailMode
              v-if="ruleForm.merchantType !== 'personal' && ruleForm.bankAccountType === 'public' && ruleForm.settleLawFlag === 'legal'"
              :img-width="4"
              :rule-form="ruleForm"
              :config-data="configData.settleData1"
            ></detailMode>
            <!--          (企业，个体工商户，个人)对私法人-->
            <detailMode
              v-if="ruleForm.bankAccountType === 'private' && ruleForm.settleLawFlag === 'legal'"
              :img-width="4"
              :rule-form="ruleForm"
              :config-data="configData.settleData2"
            ></detailMode>
            <!--          (企业，个体工商户)对私非法人-->
            <detailMode
              v-if="ruleForm.merchantType !== 'personal' && ruleForm.bankAccountType === 'private' && ruleForm.settleLawFlag === 'unlegal'"
              :img-width="4"
              :rule-form="ruleForm"
              :config-data="configData.settleData3"
            ></detailMode>
            <detailMode
              :img-width="4"
              :rule-form="ruleForm"
              :config-data="configData.other"
            ></detailMode>
          </div>
          <div v-if="showComponents.showOperBtns" class="btn-box">
            <div class="btn_pass" @click="onClick_pass">资料已检查并提交签约</div>
            <div class="btn-reject" @click="onClick_reject">驳回</div>
          </div>
        </div>
      </transition>
      <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
        <div class="p-head">{{ fromConfigData.title }}</div>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </el-drawer>
    </template>
  </div>
</template>
<script>
import api from "@/api/api_merchantAudit";
import detailMode from "@/components/detailMode/detailMode2.vue";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG, CONFIG_DATA } from "../formConfig/indirectDetailConfig";

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
      greyListData: '',
      activeIndex: 1,
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false
      },
      channelCode: "",
      // approval通过 checking审核中 reject驳回
      currentType: "",
      ruleForm: {},
      configData: null
    };
  },
  computed: {
    auditClassName() {
      switch (this.ruleForm.status) {
        case 'channelAudit':
        case 'platformAudit':
          return 'dotAudit'
        case 'platformReject':
        case 'channelReject':
          return 'dotReject'
        default:
          return 'dot'
      }
    }
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
    this.configData = this.$g.utils.deepClone(CONFIG_DATA)
  },
  mounted() {
    this.merchantNo = this.$route.query.merchantNo
    this.channelStatusList = JSON.parse(this.$route.query.channelStatusList)
    if (this.channelStatusList) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      const activeIndex = ((this.activeIndex - 1) <= 0) ? 0 : (this.activeIndex - 1)
      api.getChannelDetailByNo({
        merchantNo: this.merchantNo,
        channelCode: this.channelStatusList[activeIndex].channelCode,
        channelAgentCode: this.channelStatusList[activeIndex].channelAgentCode
      }).then(res => {
        if (res.data.bankAccountType === 'public') {
          if (res.data.settleLawFlag === 'legal') {
            res.data.accountType = '对公-法人'
          }
          if (res.data.settleLawFlag === 'unlegal') {
            res.data.accountType = '对公-非法人'
          }
        }
        if (res.data.bankAccountType === 'private') {
          if (res.data.settleLawFlag === 'legal') {
            res.data.accountType = '对私-法人'
          }
          if (res.data.settleLawFlag === 'unlegal') {
            res.data.accountType = '对私-非法人'
          }
        }
        if (res.data.merchantType === 'enterprise') {
          res.data.merchantTypeName = '企业'
        }
        if (res.data.merchantType === 'personal') {
          res.data.merchantTypeName = '个人'
        }
        if (res.data.merchantType === 'individual') {
          res.data.merchantTypeName = '个体工商户'
        }
        if (res.data.cloudPayLe1000Rate) {
          res.data.cloudPayLe1000RatePecent = this.$g.utils.AccMul(res.data.cloudPayLe1000Rate, 1000) + '‰'
          res.data.cloudPayGt1000RatePecent = this.$g.utils.AccMul(res.data.cloudPayGt1000Rate, 1000) + '‰'
        }
        if (!res.data.cloudPayLe1000Rate) {
          res.data.cloudPayGt1000RatePecent = '0‰'
          res.data.cloudPayLe1000RatePecent = '0‰'
        }
        if (res.data.greyList && res.data.greyList.length > 0) {
          this.greyListData = res.data.greyList.join(',')
        }
        res.data.alipayRatePecent = this.$g.utils.AccMul(res.data.alipayRate, 1000) + '‰'
        this.ruleForm = res.data
        this.currentType = res.data.status
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
        })
      }).catch(() => {
        this.$message({
          message: '取消操作',
          type: 'info'
        });
      })
    },
    confirm($data) {
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
          channelAgentCode: this.channelStatusList[this.activeIndex - 1].channelAgentCode,
          reason: $data.reason
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已驳回',
              type: 'success'
            })
            this.drawer = false
            this.$router.replace({
              name: 'indirectList'
            })
          }
        })
      }
    },
    cancel() {
      this.drawer = false;
    },
    onClick_reject() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.rejectReason;
    },
    getTableData() {},
    // handleSelect($index) {
    //   this.activeIndex = $index;
    //   this.channelCode = $index;
    // },
    onClick_edit($item) {
      $item.edit = true;
    },
    onClick_okEdit($item) {
      $item.edit = false;
    },
    onClick_cancelEdit($item) {
      $item.edit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tab_top {
  width: 100%;
  background: #fff;
  padding-top: 24px;

  .title {
    display: block;
    padding: 0 0 0 24px;
    font-size: 20px;
    font-weight: 500;
  }
}

.btn-box {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 40px;
  .btn_pass {
    width: 205px;
    height: 40px;
    background: rgba(25, 137, 250, 1);
    border-radius: 4px;
    line-height: 40px;
    color: #fff;
    cursor: pointer;
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
    cursor: pointer;
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
}
.dotAudit {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #ffae00;
  vertical-align: middle;
  margin: 0 5px;
}
.dotReject {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #f5222d;
  vertical-align: middle;
  margin: 0 5px;
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
