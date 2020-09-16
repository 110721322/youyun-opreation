<template>
  <div class="main_page">
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
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      testData: [],
      api: api_statistice.selectIndirectDataByPage,
      params: {
        beginDate: '',
        endDate: ''
      }
    }
  },
  mounted() {
    this.params = {
      beginTime: this.$g.utils.getToday(),
      endTime: this.$g.utils.getToday()
    };
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
</style>

