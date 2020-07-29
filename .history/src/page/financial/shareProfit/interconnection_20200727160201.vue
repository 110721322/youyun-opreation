<template>
  <div class="main_page">
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />
    <div class="table_box">
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="null"
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
export default {
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      testData: [],
      searchHeight: '260',
      params: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.testData = [
        {
          name: '紫菜汤',
          total: '1000',
          profit: '500',
          serviceProfit: '100'
        }
      ]
    },
    search() {}
  }
}
</script>

<style scoped>
  .table_box {
    margin-top: 24px;
    padding: 0 24px;
  }
</style>

