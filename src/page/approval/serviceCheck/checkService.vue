<template>
  <div>
    <div class="tab_head">
      <span class="title">下级服务商审核</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

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
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @detail="handleDetail"
        @preApprove="handlePreApprove"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_merchantAudit";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./../formConfig/checkServiceListSearch";
import { CHECKSERVICELIST_CONFIG } from "./../tableConfig/checkServiceListConfig";

export default {
  name: "CheckService",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: CHECKSERVICELIST_CONFIG,
      testData: [],
      searchHeight: "260",
      params: {},
      api: ""
    };
  },
  created() {
    this.params.beginDate = this.$g.utils.getToday(-6);
    this.params.endDate = this.$g.utils.getToday(0);
    this.api = api.querySubAudit
  },
  mounted() {},
  methods: {
    handleDetail(row) {
      this.$router.push({
        name: "checkServiceListDetail",
        query: {
          agentNo: row.agentNo
        }
      });
    },
    handlePreApprove(row) {
      this.$router.push({
        name: "checkServiceListDetail",
        query: {
          agentNo: row.agentNo
        }
      });
    },
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date[0] ? $ruleForm.date[0] : this.$g.utils.getToday(-6),
        endDate: $ruleForm.date[0] ? $ruleForm.date[1] : this.$g.utils.getToday(0),
        contractStatus: $ruleForm.contractStatus,
        operationId: $ruleForm.operationId,
        personName: $ruleForm.personName,
        personMobile: $ruleForm.personMobile,
        [$ruleForm.search]: $ruleForm.searchVal
      };
      this.params = params;
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
