<template>
  <div>
    <div class="tab_head">
      <span class="title">服务商续费记录</span>
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
        :hide-edit-area="configData.hideEditArea"
        @detail="onClickDetail"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_financialAudit.js";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "./formConfig/renewalRecordSearch";
import { TABLE_CONFIG } from "./tableConfig/renewalRecordConfig";

export default {
  name: "RenewalRecord",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG, // 搜索项的参数
      configData: TABLE_CONFIG, // 列表参数
      searchHeight: "260", // 搜索项展开的高度
      id: this.$route.query.id,
      params: {
        id: this.$route.query.id
      }, // 接口请求参数
      api: api.getById // 查询服务商续费记录
    };
  },
  mounted() {},
  methods: {
    // 点击进入详情页面
    onClickDetail($row) {
      this.$router.push({
        name: "agentDetail",
        query: { id: $row.id }
      });
    },
    search($ruleForm) {
      this.params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        operateUserNo: $ruleForm.operateUserNo,
        status: $ruleForm.status,
        [$ruleForm.search]: $ruleForm.searchVal
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
