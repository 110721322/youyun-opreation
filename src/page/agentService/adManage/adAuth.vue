<template>
  <div class>
    <div class="tab_head">
      <span class="title">广告权限</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="250"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        :params="params"
        :api-service="api"
        @editAuth="handleEditAuth"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @confirm="confirm"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import api from "@/api/api_agent.js";
import { SEARCH_CONFIG } from "../formConfig/adAuthSearch";
import { FORM_CONFIG } from "../formConfig/adAuthForm";
import { TABLE_CONFIG } from "../tableConfig/adAuthConfig";

export default {
  name: "AdAuth",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "260",
      drawer: false,
      params: {
        agentName: "",
        agentNo: "",
        cityCode: "",
        operationId: 0,
        privilege: 0,
        provinceCode: ""
      },
      api: api.advertPrivilege
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleEditAuth() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.formData;
    },
    confirm($ruleForm) {
      api
        .advertPrivilegeUpdate({
          agentNo: "",
          privilegeList: $ruleForm.baseData
        })
        .then(res => {
          this.drawer = false;
        });
    },
    cancel() {
      this.drawer = false;
    },
    search($ruleForm) {
      this.params = {
        agentName: "",
        agentNo: "",
        cityCode: "",
        operationId: $ruleForm.operationId,
        privilege: $ruleForm.privilege,
        provinceCode: ""
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      if ($ruleForm.area) {
        this.params.cityCode = $ruleForm.area[1];
        this.params.provinceCode = $ruleForm.area[0];
      }
    },
    getTableData() {
      this.testData = [
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showPreApprove: true
        },
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showDetail: true,
          showPass: true,
          showReject: true
        },
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showDetail: true
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
<style>
</style>
