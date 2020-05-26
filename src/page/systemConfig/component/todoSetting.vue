<template>
  <div>
    <DetailMod
      :is-show-edit-btn="true"
      :rule-form="ruleForm"
      :config-data="configData"
      @edit="onClick_edit('params')"
    ></DetailMod>
    <DetailMod
      :is-show-edit-btn="true"
      :rule-form="ruleForm"
      :config-data="configData2"
      @edit="onClick_edit('customerPrice')"
    ></DetailMod>
    <DetailMod
      :is-show-edit-btn="true"
      :rule-form="ruleForm"
      :config-data="configData3"
      @edit="onClick_edit('payData')"
    ></DetailMod>

    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_params";
import Form from "@/components/form/index.vue";
import DetailMod from "@/components/detailMode/detailMode2.vue";
import { FORM_CONFIG } from "./../formConfig/paramsDetail";
export default {
  name: "Theme",
  components: { Form, DetailMod },
  data() {
    return {
      drawer: false,
      ruleForm: {
        name1: "2"
      },
      fromConfigData: {},
      configData: {
        name: "参数设置",
        border: true,
        headColor: "#ebeef5",
        items: [
          {
            name: "任务倒计时",
            key: "isTaskCountdown",
            type: "switch"
          },
          {
            name: "钉钉通讯地址",
            key: "dingdingAddress"
          }
        ]
      },
      configData2: {
        name: "客单价异常",
        border: true,
        headColor: "#ebeef5",
        items: [
          {
            name: "客单价≥",
            key: "perCustomerTransaction",
            hideColon: true
          },
          {
            name: "交易笔数≥",
            key: "transactionNum",
            hideColon: true
          }
        ]
      },
      configData3: {
        name: "交易数据异常",
        border: true,
        headColor: "#ebeef5",
        items: [
          {
            name: "比较类型",
            key: "dataComparisonType"
          },

          {
            name: "交易笔数≥",
            key: "dataTransactionNum",
            hideColon: true
          },
          {
            name: "比例≥",
            key: "dataRatio",
            hideColon: true
          }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      api
        .details({})
        .then(res => {
          Object.keys(res.object).forEach((item, index) => {
            if (item === "isTaskCountdown") {
              this.$set(this.ruleForm, "isTaskCountdown", !!res.object[item]);
              return;
            }
            if (item === "dataComparisonType") {
              this.$set(
                this.ruleForm,
                "dataComparisonType",
                res.object[item] ? "环比" : "同比"
              );
              return;
            }
            this.$set(this.ruleForm, item, res.object[item]);
          });
        })
        .catch();
    },
    cancel(done) {
      this.drawer = false;
    },
    confirm($ruleForm) {
      console.log($ruleForm);
      api
        .update($ruleForm)
        .then(res => {
          api.update({
            isTaskCountdown: $ruleForm.isTaskCountdown,
            perCustomerTransaction: $ruleForm.perCustomerTransaction,
            dingdingAddress: $ruleForm.dingdingAddress,
            transactionNum: $ruleForm.transactionNum,
            dataComparisonType: $ruleForm.dataComparisonType,
            dataTransactionNum: $ruleForm.dataTransactionNum,
            dataRatio: $ruleForm.dataRatio
          });
          this.$message("修改成功");
        })
        .catch(err => {
          console.error(err);
        });
    },
    onClick_edit($formName) {
      this.fromConfigData = FORM_CONFIG[$formName];
      this.drawer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
