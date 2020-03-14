<template>
  <div class>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <BaseCrud
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
      searchHeight: "320"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    search() {},
    getData() {
      this.testData = [
        {
          service: "1",
          inMerchantNum: "利郎男装有限公司",
          outMerchantNum: "707",
          amount: "¥ 206",
          times: "¥ 206",
          timesPerc: "¥ 206",
          everyPrice: "¥ 206",
          amountPerc: "¥ 206",
          memberAmount: "¥ 206",
          memberTimes: "¥ 206"
        }
      ];
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
