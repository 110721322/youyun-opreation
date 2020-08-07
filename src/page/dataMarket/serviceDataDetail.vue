<template>
  <div class>
    <Search :open-height="searchHeight" :permission="searchConfig.permission" :form-base-data="searchConfig.formData" @search="search" />

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
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_dataMarket";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { FORM_CONFIG } from "./formConfig/serviceDataDetailSearch";
import { MERCHANTDATADETAILCONFIG } from "./tableConfig/serviceDataDetailConfig";
export default {
  name: "MerchantDataDetail",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: FORM_CONFIG,
      configData: MERCHANTDATADETAILCONFIG,
      testData: [],
      searchHeight: "320",
      params: {
        agentNo: null,
        agentName: null,
        positionLabelId: null,
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday(),
        sortField: this.$route.query.sortField ? this.$route.query.sortField : 'tradeAmount',
        sortRule: 'desc',
        regionCode: null,
        operationId: null,
        currentPage: 0,
        pageSize: 10
      },
      api: api.queryAgentTradeList
    };
  },
  mounted() {
    this.tradeDataQueryInit();
  },
  methods: {
    search($ruleForm) {
      this.params = {
        [$ruleForm.agent]: $ruleForm['agentVal'],
        positionLabelId: $ruleForm['positionLabelId'],
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        sortField: this.params.sortField,
        sortRule: this.params.sortRule,
        regionCode: $ruleForm['regionCode'],
        operationId: $ruleForm['operationId'],
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize
      };
    },
    tradeDataQueryInit() {
      api.tradeDataQueryInit()
    }
  }
};
</script>
<style scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  min-width: 1000px;
}
</style>
