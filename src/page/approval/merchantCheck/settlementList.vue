<template>
  <div class>
    <router-view
      v-if="this.$route.path.indexOf('/detail') !== -1||this.$route.path.indexOf('/recordDetail') !== -1"
    />
    <div v-else>
      <div class="tab_head">
        <span class="title">结算卡修改审核</span>
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
          @record="handleRecord"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_merchantAudit";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./../formConfig/settlementListSearch";
import { SETTELMENTLIST_CONFIG } from "./../tableConfig/settlementListConfig";

export default {
  name: "SettlementList",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SETTELMENTLIST_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "260",
      params: {
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday(),
        agentNo: "rn4",
        agentName: "5ff",
        pageSize: 0,
        channelStatus: "u22",
        operationUserNo: "mef",
        currentPage: 0,
        merchantNo: "iy7",
        merchantName: "y6a"
      },
      api: api.settleCardAuditQueryByPage
    };
  },
  mounted() {},
  methods: {
    handleDetail() {
      this.$router.push({
        path: "/approval/checkMerchant/settlementList/detail"
      });
    },
    handlePreApprove() {
      this.$router.push({
        path: "/approval/checkMerchant/settlementList/detail"
      });
    },
    handleRecord() {
      this.$router.push({
        path: "/approval/checkMerchant/settlementList/recordDetail"
      });
    },
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        auditStatus: $ruleForm.auditStatus,
        operateUserNo: $ruleForm.operateUserNo
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
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
