<template>
  <div class="main_page">
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" :is-show-all="false" @search="search" />
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
// import DateSelect from "@/components/DateSelect.vue";
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
      searchHeight: '260',
      api: api_statistice.selectIndirectDataByPage,
      params: {
        beginDate: '',
        endDate: ''
      }
    }
  },
  mounted() {
    this.getData()
    this.search()
  },
  methods: {
    // getData() {
    //   this.testData = [
    //     {
    //       name: '紫菜汤',
    //       total: '1000',
    //       profit: '500',
    //       serviceProfit: '100'
    //     }
    //   ]
    // },
    search($datatime) {
      this.beginDate = $datatime.date[0]
      this.endDate = $datatime.date[1]
      console.log(this.params)
    }
  }
}
</script>

<style scoped>
  .table_box {
    margin-top: 24px;
    padding: 0 24px;
  }
</style>

