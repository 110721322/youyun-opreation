<template>
  <div>
    <div class="tab_head">
      <span class="title">结算审核详情</span>
    </div>

    <div class="table_box">
      <BaseCrud
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        :is-async="false"
        :is-select="false"
        :is-expand="false"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_financialAudit.js";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { RECORD_CONFIG } from "../tableConfig/commissionDetail";

export default {
  name: "CommissionDetail",
  components: { BaseCrud },
  data() {
    return {
      configData: RECORD_CONFIG,
      testData: [],
      direction: "rtl",
      params: {
        idList: this.$route.query.idList.split(',')
      },
      api: ''
    };
  },
  created() {
    this.api = this.$route.query.activeName === 0 ? api.topQueryTypeMonthDetail : api.queryTypeMonthDetail
  },
  mounted() {},
  methods: {}
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
