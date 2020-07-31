<template>
  <div class="main_page">
    <Search
      :is-show-all="ture"
      :open-height="searchHeight"
      :form-base-data="searchConfig.formData"
      @search="search"
    />
    <div class="table_box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="null"
        :hide-edit-area="true"
      />
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/activityDetail";
import {SERVICE_CONFIG} from "../tableConfig/activityDetailConfig";
export default {
  components: { Search, BaseCrud },
  data() {
    return {
      configData: SERVICE_CONFIG,
      searchConfig: SEARCH_CONFIG,
      testData: [],
      params: {}
    }
  },
  methods: {
    search() {}
  }
}
</script>

<style scoped>
  .table_box {
    width: 100%;
    margin-top: 24px;
    padding: 0 24px;
  }
</style>
