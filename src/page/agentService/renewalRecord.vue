<template>
  <div>
    <div class="tab_head">
      <span class="title">服务商续费记录</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="api"
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
        @detail="handleDetail"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_financialAudit.js";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./formConfig/renewalRecordSearch";
import { TABLE_CONFIG } from "./tableConfig/renewalRecordConfig";

export default {
  name: "RenewalRecord",
  components: { Search, BaseCrud },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      testData: [],
      searchHeight: "260",
      drawer: false,
      id: this.$route.query.id,
      params: {
        id: this.$route.query.id
      },
      api: api.getById
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.drawer = false;
    },
    handleDetail($row) {
      this.$router.push({
        name: "agentDetail",
        query: { id: $row.id }
      });
    },
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        operateUserNo: $ruleForm.operateUserNo,
        status: $ruleForm.status,
        [$ruleForm.search]: $ruleForm.searchVal
      };
      this.params = params;
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
