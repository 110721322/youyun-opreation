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

    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
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
            key: "name1",
            type: "switch"
          },
          {
            name: "钉钉通讯地址",
            key: "name1"
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
            key: "name1",
            hideColon: true
          },
          {
            name: "交易笔数≥",
            key: "name1",
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
            key: "name1"
          },

          {
            name: "客单价≥",
            key: "name1",
            hideColon: true
          },
          {
            name: "比例≥",
            key: "name1",
            hideColon: true
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    cancel(done) {
      done();
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
