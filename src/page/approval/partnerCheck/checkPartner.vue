<template>
  <div>
    <div class="tab_head">
      <span class="title">合伙人审核</span>
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

import { SEARCH_CONFIG } from "./../formConfig/checkPartnerListSearch";
import { CHECKPARTNERLIST_CONFIG } from "./../tableConfig/checkPartnerListConfig";

export default {
  name: "CheckPartner",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: CHECKPARTNERLIST_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "320",
      params: {},
      api: ""
    };
  },
  mounted() {},
  created() {
    this.params.beginDate = this.getDay(0);
    this.params.endDate = this.getDay(0);
    this.api = api.queryAuditPageByCondition
  },
  methods: {
    getDay(day) {
      var today = new Date();
      const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    },
    handleDetail(row) {
      this.$router.push({
        name: "checkPartnerListDetail",
        query: {
          agentPartnerNo: row.partnerNo
        }
      });
    },
    handlePreApprove(row) {
      this.$router.push({
        name: "checkPartnerListDetail",
        query: {
          agentPartnerNo: row.partnerNo
        }
      });
    },
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date[0] ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date[0] ? $ruleForm.date[1] : null,
        contractStatus: $ruleForm.contractStatus,
        jobType: $ruleForm.jobType
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
