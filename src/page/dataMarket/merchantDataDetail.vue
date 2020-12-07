<template>
  <div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table-box">
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

import { FORM_CONFIG } from "./formConfig/merchantDataDetailSearch";
import { MERCHANTDATADETAILCONFIG } from "./tableConfig/merchantDataDetailConfig";
export default {
  name: "MerchantDataDetail",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: FORM_CONFIG,
      configData: MERCHANTDATADETAILCONFIG,
      testData: [],
      searchHeight: "380",
      params: {
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday(),
        sortField: this.$route.query.sortField ? this.$route.query.sortField : 'tradeAmount',
        sortRule: 'desc',
        currentPage: 1,
        pageSize: 10
      },
      api: api.queryTradeSummaryAndCycleByCondition
    };
  },
  mounted() {
    this.tradeDataQueryInit();
  },
  methods: {
    search($ruleForm) {
      this.params = {
        [$ruleForm.field]: $ruleForm['fieldVal'],
        beginDate: $ruleForm.date ? $ruleForm.date[0] : this.$g.utils.getToday(),
        endDate: $ruleForm.date ? $ruleForm.date[1] : this.$g.utils.getToday(),
        sortField: this.params.sortField,
        sortRule: this.params.sortRule,
        provinceCode: $ruleForm['area'] ? $ruleForm['area'][0] : null,
        cityCode: $ruleForm['area'] ? $ruleForm['area'][1] : null,
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
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  min-width: 1000px;
}
</style>
