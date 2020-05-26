<template>
  <div class="">
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
    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
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
      searchHeight: "260",
      drawer: false,
      rowAgentNo: "",
      params: {
        agentNo: "",
        agentName: "",
        cityCode: "",
        operationId: null,
        privilege: null,
        provinceCode: ""
      },
      api: api.advertPrivilege
    };
  },
  mounted() {
  },
  methods: {
    handleEditAuth($row) {
      console.log('$rowww', $row);
      this.rowAgentNo = $row.agentNo;
      this.drawer = true;
      // 编辑前重赋值
      FORM_CONFIG.formData.formData.forEach((item, index) => {
        item.initVal = $row.privilege;
      });
      this.fromConfigData = FORM_CONFIG.formData;
    },
    confirm($ruleForm) {
      console.log("ruleForm值", $ruleForm);
      api
        .advertPrivilegeUpdate({
          agentNo: this.rowAgentNo,
          privilegeList: $ruleForm.baseData
        })
        .then(res => {
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
        agentName: "",
        agentNo: "",
        cityCode: "",
        operationId: $ruleForm.operationId,
        privilege: $ruleForm.privilege,
        provinceCode: ""
      };
      console.log("查询", $ruleForm);
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      console.log("1233", this.params);
      if ($ruleForm.area) {
        this.params.cityCode = $ruleForm.area[1];
        this.params.provinceCode = $ruleForm.area[0];
      }
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
