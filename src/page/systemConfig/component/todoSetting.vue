<template>
  <div>
    <DetailMod
      :is-show-edit-btn="true"
      :rule-form="ruleForm"
      :config-data="configData"
      :span-width="12"
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

    <div class="btn-box">
      <el-button size="medium" type="primary" @click="save">保存</el-button>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
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
import { FORM_CONFIG } from "../formConfig/paramsDetail";
export default {
  name: "TodoSetting",
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
            key: "dataComparisonType",
            formatter($params) {
              if ($params.dataComparisonType) {
                return '环比'
              } else {
                return '同比'
              }
            }
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
        .details()
        .then(res => {
          // if (res.datas.isTaskCountdown === 1) {
          //   res.datas.isTaskCountdownCn = true
          // }
          // if (res.datas.isTaskCountdown === 0) {
          //   res.datas.isTaskCountdownCn = false
          // }
          Object.keys(res.datas).forEach((item, index) => {
            if (item === "isTaskCountdown") {
              this.$set(this.ruleForm, "isTaskCountdown", Boolean(res.datas[item]));
              return;
            }
            this.$set(this.ruleForm, item, res.datas[item]);
          });
        })
    },
    cancel(done) {
      this.drawer = false;
    },
    confirm($ruleForm) {
      this.$message({
        type: 'warning',
        message: '请记得保存'
      })
      this.drawer = false;
      Object.assign(this.ruleForm, $ruleForm);
    },
    onClick_edit($formName) {
      this.fromConfigData = FORM_CONFIG[$formName];
      this.fromConfigData.formData.forEach($formItem => {
        $formItem.initVal = this.ruleForm[$formItem.key];
      })
      this.drawer = true;
    },
    save() {
      api.update({
        isTaskCountdown: this.ruleForm.isTaskCountdown ? 1 : 0,
        perCustomerTransaction: this.ruleForm.perCustomerTransaction,
        dingdingAddress: this.ruleForm.dingdingAddress,
        transactionNum: this.ruleForm.transactionNum,
        dataComparisonType: this.ruleForm.dataComparisonType,
        dataTransactionNum: this.ruleForm.dataTransactionNum,
        dataRatio: this.ruleForm.dataRatio
      }).then(res => {
        this.$message({
          type: 'success',
          message: '已保存'
        });
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .btn-box {
    padding: 30px 24px;
    border-top: 1px solid #ededed;
  }
</style>
