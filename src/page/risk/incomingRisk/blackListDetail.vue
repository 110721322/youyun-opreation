<template>
  <div class>
    <div class="tab_head">
      <span class="title">黑名单拦截记录</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <BaseCrud
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
        :hide-edit-area="true"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";

import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "../formConfig/blackListDetailSearch";
import { TABLE_CONFIG } from "../tableConfig/blackListDetailConfig";

export default {
  name: "LeRiskList",
  components: { Search, BaseCrud },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "260",
      drawer: false
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    cancel(done) {
      done();
    },
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
    },
    getTableData() {
      this.testData = [
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showChecking: true
        },
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showDetail: true
        },
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showDetail: true
        }
      ];
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
