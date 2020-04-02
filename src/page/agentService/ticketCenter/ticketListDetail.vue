<template>
  <div class>
    <div class="tab_head">
      <span class="title">工单详情</span>
    </div>

    <transition name="fade">
      <div>
        <div>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm.baseData"
            :config-data="configData.orderData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm.serviceSetupData"
            :config-data="configData.agentData"
          ></detailMode>
          <detailMode
            :img-width="4"
            :rule-form="ruleForm.serviceSetupData"
            :config-data="configData.questionData"
          ></detailMode>
          <detailMode
            v-if="showComponents.showDealData"
            :img-width="4"
            :rule-form="ruleForm.serviceSetupData"
            :config-data="configData.dealData"
          ></detailMode>
          <detailMode
            v-if="showComponents.showEvaluationData"
            :img-width="4"
            :rule-form="ruleForm.serviceSetupData"
            :config-data="configData.evaluationData"
          ></detailMode>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_pass" @click="onClick_distribution">分配</div>
          <div class="btn-reject" @click="onClick_reply">回复</div>
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
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_merchantAudit";
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
      ruleForm: {
        baseData: {
          superService: "32943098094",
          type: "浙江省杭州市西湖区黄姑山路工专路交叉路口",
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic2:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic3:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          company: "3310281995",
          name: "3310281995",
          phone: "3310281995009208899",
          address: "3310281995009208899",
          detailAddress: "3310281995009208899",
          email: "33102819908899"
        },
        serviceSetupData: {
          address: "企业",
          way: "山东紫菜",
          aliWxPerc: "2019-03-10",
          yunLessPerc: "3428947394238",
          yunMorePerc: "18503892300",
          endTime: "2019-03-10"
        }
      },
      configData: {
        orderData: {
          name: "订单信息",
          items: [
            {
              name: "工单编号",
              key: "superService"
            },
            {
              name: "提交时间",
              key: "type"
            }
          ]
        },
        agentData: {
          name: "服务商信息",
          items: [
            {
              name: "服务商ID",
              key: "address"
            },
            {
              name: "服务商名称",
              key: "way"
            },
            {
              name: "手机号",
              key: "aliWxPerc"
            },
            {
              name: "电话可接通时间",
              key: "yunLessPerc"
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
              key: "address"
            },
            {
              name: "问题类型",
              key: "way"
            },
            {
              name: "问题内容",
              key: "aliWxPerc"
            },
            {
              name: "优先级",
              key: "yunLessPerc"
            },
            {
              name: "高优先级原因",
              key: "aa"
            }
          ]
        },
        dealData: {
          name: "处理信息",
          items: [
            {
              name: "处理人员",
              key: "address"
            },
            {
              name: "解决方案",
              key: "way"
            }
          ]
        },
        evaluationData: {
          name: "客户评价",
          items: [
            {
              name: "总体评分",
              key: "address"
            },
            {
              name: "业务能力",
              key: "way"
            },
            {
              name: "解决时效",
              key: "aliWxPerc"
            },
            {
              name: "问题是否解决",
              key: "yunLessPerc"
            },
            {
              name: "评价内容",
              key: "evaluation"
            }
          ]
        }
      }
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
  },
  methods: {
    confirm($data) {
      console.log($data);
      api
        .updateSubAuditStatusOfReject({
          agentNo: "",
          reason: $data["reason"]
        })
        .then(res => {
          this.$message("已驳回");
          this.drawer = false;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    onClick_distribution() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.distributionData;
    },
    cancel() {
      this.drawer = false;
    },
    onClick_reply() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.replyData;
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
