<template>
  <div>
    <div class="tab_head">
      <span class="title">黑名单拦截记录</span>
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
import api from "@/api/api_risk";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/blackListDetailSearch";
import { TABLE_CONFIG } from "../tableConfig/blackListDetailConfig";

export default {
  name: "BlackListDetail",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      searchHeight: "260",
      params: {
        beginTime: this.$g.utils.getToday(-6),
        endTime: this.$g.utils.getToday(0)
      },
      api: api.merchantBanFilterLogQueryByPage
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      this.params = {
        beginTime: $ruleForm.date[0] ? $ruleForm.date[0] : this.$g.utils.getToday(-6),
        endTime: $ruleForm.date[0] ? $ruleForm.date[1] : this.$g.utils.getToday(0),
        operationId: $ruleForm.operateUserNo ? $ruleForm.operateUserNo : null,
        banField: $ruleForm.search,
        content: $ruleForm.searchVal
      }
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

