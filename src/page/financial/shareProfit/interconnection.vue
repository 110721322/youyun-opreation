<template>
  <div>
    <div class="tab_head">
      <span class="title">间连分润对账表</span>
    </div>
    <Search :form-base-data="searchConfig.formData" :is-show-all="true" @search="search" />
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
        :grid-edit-width="100"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="true"
      ></BaseCrud>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/interconnectionSearch";
import { SERVICE_CONFIG } from "../tableConfig/interconnectionConfig";
import api_statistice from "@/api/api_statistice"
export default {
  name: "Interconnection",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      testData: [],
      params: {
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday()
      },
      api: api_statistice.selectIndirectDataByPage
    }
  },
  created() {
  },
  mounted() {
    // this.getData()
    // this.search()
  },
  methods: {
    search($datatime) {
      this.params = {
        beginDate: $datatime.date[0],
        endDate: $datatime.date[1]
      }
    }
  }
}
</script>

<style scoped>
  .table_box {
    margin: 24px;
    padding: 24px;
    background: white;
  }
  .tab_head{
    border-bottom: 0px;
  }
</style>

