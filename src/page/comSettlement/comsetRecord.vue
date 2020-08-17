<template>
  <div class="main_page">
    <div class="p_head">结算记录</div>
    <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
    />
    <div class="table_head">
      <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :params="params"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          :api-service="api"
      ></BaseCrud>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_comSettlement"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "./formConfig/comsetRecordSearch"
import { RECORD_CONFIG } from "./tableConfig/comsetRecordConfig"
import search from "@/components/search/search.vue";
export default {
  name: "COMSETRECORD",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: '200',
      searchConfig: SEARCH_CONFIG,
      configData: RECORD_CONFIG,
      testData: [],
      params: {},
      api: api.querySettleRecord
    }
  },
  created() {},
  methods: {
    search() {}
  }
}
</script>

<style scoped>
  .table_head {
    padding: 32px 24px 0 24px;
  }
</style>
