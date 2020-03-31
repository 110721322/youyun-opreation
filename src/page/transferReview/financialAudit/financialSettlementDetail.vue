<template>
  <div class>
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
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_merchantAudit";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { RECORD_CONFIG } from "./../tableConfig/financialSettlementDetailConfig";

export default {
  name: "AliRecordDetail",
  components: { BaseCrud },
  data() {
    return {
      configData: RECORD_CONFIG,
      testData: [],
      direction: "rtl",
      params: {
        channel: "ol7",
        pageSize: 0,
        currentPage: 0,
        merchantNo: "anw"
      },
      api: api.preAuditRecordQueryByPage
    };
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
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
}
</style>
<style>
</style>
