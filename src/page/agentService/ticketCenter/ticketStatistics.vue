<template>
  <div>
    <div class="tab-head">
      <span class="title">工单统计</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table-box">
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="100"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @detail="onClickDetail"
      ></BaseCrud>
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
  name: "TicketStatistics",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG, // 搜索参数
      configData: TABLE_CONFIG, // 列表展示数据
      searchHeight: "260", // 列表展开项数据
      params: {
        startTime: this.$g.utils.getToday(0) + ' 00:00:00',
        endTime: this.$g.utils.getToday(0) + ' 23:59:59'
      },
      api: api.workerOrderStatisticQueryByPage,
      employeeList: this.$store.state.system.employeeList // 成员列表
    };
  },
  mounted() {},
  methods: {
    // 点击查看详情
    onClickDetail($data) {
      this.$router.push({
        name: "ticketList",
        query: { id: $data.operatorId }
      });
    },
    search($ruleForm) {
      this.params = {
        startTime: $ruleForm.date ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date ? $ruleForm.date[1] : null,
        operatorId: $ruleForm.operatorId,
        [$ruleForm.inputSelect]: $ruleForm.inputForm
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
