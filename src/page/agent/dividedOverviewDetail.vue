<template>
  <div>
    <div class="p-head">商户分润明细</div>
    <search
      :is-show-all="true"
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table-box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="50"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :hide-edit-area="true"
        :params="params"
        :api-service="api"
      />
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/dividedOverviewDetailConfig";
import { FORM_CONFIG } from "./formConfig/dividedOverviewDetailSearch";
import api from "@/api/api_agent.js"

export default {
  name: "DividedOverviewDetail",
  components: { search, BaseCrud },

  data() {
    return {
      searchMaxHeight: "120", // 搜索项展开高度
      configData: USER_CONFIG, // 列表展示参数
      searchConfig: FORM_CONFIG, // 搜索项的参数
      params: {}, // 搜索参数
      api: api.merchantCommission
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {},
    search($form) {
      this.params = {
        [$form.search]: $form.searchVal
      }
    }
  }
};
</script>

<style scoped>
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
