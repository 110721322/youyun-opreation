<template>
  <div class="main_page">
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" :isShowAll="true"/>
    <div class="table_box">
      <div class="table-title">
        <li>间联</li>
        <li>直连</li>
        <li>直连官方分润</li>
      </div>
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
              :hideEditArea="true"
      ></BaseCrud>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/serviceDetailSearch";
import { SERVICE_CONFIG } from "../tableConfig/serviceDetailConfig";
export default {
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      testData: [],
      searchHeight: 88
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.testData = [
        {
          shopName: '紫菜汤',
          total: '1000',
          totalProfit: '500',
          aply: '100',
          wechat: '300'
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
    padding: 32px 24px 0 24px;
  }
  .table-title {
    width: 100%;
    display: flex;
    padding-left: 31%;
    height: 52px;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
    color: #909399;
    font-size: 14px;
    background: #ffffff;
    line-height: 52px;
  }
  .table-title li:nth-child(1) {
    width: 43%;
  }
  .table-title li:nth-child(2) {
    width: 29%;
  }
</style>

