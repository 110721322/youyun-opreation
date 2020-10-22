<template>
  <div>
    <div class="tab_head">
      <span class="title">广告权限</span>
    </div>
    <Search
      :open-height="searchHeight"
      :form-base-data="searchConfig.formData"
      @search="search"
    />
    <div class="table_box">
      <BaseCrud
        ref="table"
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
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        v-if="drawer"
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

import apiAgent from "@/api/api_agent.js";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { SEARCH_CONFIG } from "../formConfig/adAuthSearch";
import { FORM_CONFIG } from "../formConfig/adAuthForm";
import { TABLE_CONFIG } from "../tableConfig/adAuthTable";

export default {
  name: "AdAuth",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      drawer: false,
      searchHeight: "200",
      rowAgentNo: "",
      testData: [],
      fromConfigData: {},
      params: {
        agentNo: "",
        agentName: "",
        cityCode: "",
        provinceCode: "",
        operationId: null,
        privilege: null
      },
      api: apiAgent.advertPrivilege
    };
  },
  mounted() {
  },
  methods: {
    handleEditAuth($row) {
      this.rowAgentNo = $row.agentNo;
      // 编辑前重赋值
      FORM_CONFIG.formData.formData.forEach((item, index) => {
        item.initVal = $row.privilege;
      });
      this.fromConfigData = FORM_CONFIG.formData;
      this.drawer = true;
    },
    confirm($ruleForm) {
      apiAgent.advertPrivilegeUpdate({
        agentNo: this.rowAgentNo,
        privilegeList: $ruleForm.baseData
      }).then(res => {
        if (res.object) {
          this.$refs.table.getData();
          this.drawer = false;
        }
      });
    },
    cancel() {
      this.drawer = false;
    },
    search($ruleForm) {
      this.params = {
        cityCode: $ruleForm.area ? $ruleForm.area[1] : '',
        provinceCode: $ruleForm.area ? $ruleForm.area[0] : '',
        operationId: $ruleForm.operationId,
        privilege: $ruleForm.privilege
      };
      // SelectInput联合输入框赋值
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
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
