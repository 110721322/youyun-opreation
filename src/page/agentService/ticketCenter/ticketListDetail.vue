<template>
  <div class>
    <div class="tab_head">
      <span class="title">工单详情</span>
    </div>

    <transition name="fade">
      <div>
        <div>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.orderData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.agentData"></detailMode>
          <detailMode :img-width="4" :rule-form="ruleForm" :config-data="configData.questionData"></detailMode>
          <detailMode
            v-if="showComponents.showDealData"
            :img-width="4"
            :rule-form="ruleForm"
            :config-data="configData.dealData"
          ></detailMode>
          <detailMode
            v-if="showComponents.showEvaluationData"
            :img-width="4"
            :rule-form="ruleForm"
            :config-data="configData.evaluationData"
          ></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_distribution">分配</div>
          <div class="btn-reject" @click="onClick_reply">回复</div>
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
import api from "@/api/api_ticketCenter";
import detailMode from "@/components/detailMode/detailMode2.vue";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./../formConfig/ticketListDetailForm";

export default {
  name: "CheckServiceListDetail",
  components: { detailMode, Form },

  data() {
    return {
      fromConfigData: {},
      drawer: false,
      showComponents: {
        showOperBtns: false,
        showDealData: false,
        showEvaluationData: false
      },
      currentType: "",
      ruleForm: {},
      configData: {
        orderData: {
          name: "订单信息",
          items: [
            {
              name: "工单编号",
              key: "workerOrderNo"
            },
            {
              name: "提交时间",
              key: "createTime"
            }
          ]
        },
        agentData: {
          name: "服务商信息",
          items: [
            {
              name: "服务商ID",
              key: "agentNo"
            },
            {
              name: "服务商名称",
              key: "agentName"
            },
            {
              name: "手机号",
              key: "agentPhone"
            },
            {
              name: "电话可接通时间",
              key: "phoneOpenTime"
            }
          ]
        },
        questionData: {
          name: "问题信息",
          items: [
            {
              name: "附件",
              key: "pic1",
              type: "image"
            },
            {
              name: "附件",
              key: "pic2",
              type: "image"
            },
            {
              name: "附件",
              key: "pic3",
              type: "image"
            },
            {
              name: "附件",
              key: "pic4",
              type: "image"
            },
            {
              name: "问题模块",
              key: "questionModule"
            },
            {
              name: "问题类型",
              key: "questionType"
            },
            {
              name: "问题内容",
              key: "questionContent"
            },
            {
              name: "优先级",
              key: "priority"
            },
            {
              name: "高优先级原因",
              key: "hightPriorityReason"
            }
          ]
        },
        dealData: {
          name: "处理信息",
          items: [
            {
              name: "处理人员",
              key: "operatorName"
            },
            {
              name: "解决方案",
              key: "solution"
            }
          ]
        },
        evaluationData: {
          name: "客户评价",
          items: [
            {
              name: "总体评分",
              key: "grade"
            },
            {
              name: "业务能力",
              key: "abilityGrade"
            },
            {
              name: "解决时效",
              key: "agingGrade"
            },
            {
              name: "问题是否解决",
              key: "isSolution"
            },
            {
              name: "评价内容",
              key: "evaluationContent"
            }
          ]
        }
      },
      id: this.$route.query.id,
      formStatus: ""
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "undo":
          this.showComponents.showOperBtns = true;
          break;
        case "comment":
          this.showComponents.showDealData = true;
          break;
        case "done":
          this.showComponents.showDealData = true;
          this.showComponents.showEvaluationData = true;
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.currentType = "undo";
    this.getDetail();
  },
  methods: {
    getDetail() {
      api
        .detail({
          id: this.$route.query.id
        })
        .then(res => {
          this.ruleForm = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    confirm($data) {
      switch (this.formStatus) {
        case "distribution":
          api
            .designate({
              id: this.id,
              operatorId: $data.operatorId
            })
            .then(res => {
              this.$message("已分配");
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "reply":
          api
            .reply({
              id: this.id,
              solution: $data.checkSolution
            })
            .then(res => {
              this.$message("已回复");
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "checkReply":
          this.drawer = false;
          break;

        default:
          break;
      }
    },
    onClick_distribution() {
      const FormData = JSON.parse(JSON.stringify(FORM_CONFIG.distributionData));
      this.formStatus = "distribution";
      this.fromConfigData = FormData;
      this.drawer = true;
    },
    cancel() {
      this.drawer = false;
    },
    onClick_reply() {
      const FormData = JSON.parse(JSON.stringify(FORM_CONFIG.replyData));
      this.formStatus = "reply";
      this.fromConfigData = FormData;
      this.drawer = true;
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
    width: 100px;
    height: 40px;
    background: #1989fa;
    border-radius: 4px;
    line-height: 40px;
    color: #ffffff;
  }
  .btn-reject {
    width: 100px;
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
.detail-alert {
  margin: 24px;
  padding: 9px 24px;
  background-color: #ffe8e9;
  border: 1px solid #ff7f85;
  color: #f5222d;
  width: auto;
}
</style>
