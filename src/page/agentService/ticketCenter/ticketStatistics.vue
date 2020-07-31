<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">工单统计</span>
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
          :grid-edit-width="100"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @detail="handleDetail"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_ticketCenter";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "../formConfig/ticketStatisticsSearch";
import { TABLE_CONFIG } from "../tableConfig/ticketStatisticsConfig";

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
      drawer: false,
      params: {
        operatorId: "",
        startTime: this.$g.utils.getToday(0) + ' 00:00:00',
        endTime: this.$g.utils.getToday(0) + ' 23:59:59'
      },
      api: api.workerOrderStatisticQueryByPage,
      employeeList: this.$store.state.system.employeeList // 成员列表
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.drawer = false;
    },
    handleDetail($data) {
      this.$router.push({
        path: "/agentService/ticketCenter/ticketList",
        query: { id: $data.operatorId }
      });
    },
    search($ruleForm) {
      const params = {
        startTime: $ruleForm.date ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date ? $ruleForm.date[1] : null,
        operatorId: $ruleForm.operatorId
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
</style>
<style>
</style>
