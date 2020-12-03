<template>
  <div>
    <div class="tab_head">
      <span class="title">平台商户资料风控</span>
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
        @checking="onClickDetail"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_risk";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/merchantRiskListSearch";
import { LERISKLIST_CONFIG } from "../tableConfig/merchantRiskListConfig";

export default {
  name: "MerchantRiskList",
  components: { Search, BaseCrud },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: LERISKLIST_CONFIG,
      searchHeight: "260",
      params: {},
      api: api.midPlatformQueryByPage
    };
  },
  mounted() {},
  created() {
    this.params.beginDate = this.$g.utils.getToday(-6);
    this.params.endDate = this.$g.utils.getToday(0);
  },
  methods: {
    onClickDetail(row) {
      this.$router.push({
        name: "merchantRiskDetail",
        query: {
          id: row.id
        }
      });
    },
    search($ruleForm) {
      this.params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : this.$g.utils.getToday(-6),
        endDate: $ruleForm.date ? $ruleForm.date[1] : this.$g.utils.getToday(0),
        operateUserNo: $ruleForm.operateUserNo,
        status: $ruleForm.status,
        [$ruleForm.search]: $ruleForm.searchVal
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
