<template>
  <div class="main_page">
    <Search
      :is-show-all="ture"
      :open-height="searchHeight"
      :form-base-data="searchConfig.formData"
      @search="search"
    />
    <div class="table_box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        :hide-edit-area="true"
      />
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/activityDetail";
import {SERVICE_CONFIG} from "../tableConfig/activityDetailConfig";
import api_statistice from "@/api/api_statistice";
export default {
  components: { Search, BaseCrud },
  data() {
    return {
      searchHeight: '200',
      configData: SERVICE_CONFIG,
      searchConfig: SEARCH_CONFIG,
      testData: [],
      params: {},
      api: api_statistice.merchantqueryByPage
    }
  },
  methods: {
    search($ruleform) {
      this.params = {
        agentNo: $ruleform.inputSelect === 'merchantNo' ? $ruleform.inputForm : this.$route.query.agentNo,
        channelAgentCode: $ruleform.inputSelect === 'merchantName' ? $ruleform.inputForm : "",
        tradeMonth: $ruleform.data === '' ? $ruleform.inputForm : this.$route.query.tradeMonth
      }
      console.log(this.params)
    }
  }
}
</script>

<style scoped>
  .table_box {
    width: 100%;
    margin-top: 24px;
    padding: 0 24px;
  }
</style>
