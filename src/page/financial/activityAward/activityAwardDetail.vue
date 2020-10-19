<template>
  <div>
    <Search
      :is-show-all="false"
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
  name: "ActivityAwardDetail",
  components: { Search, BaseCrud },
  data() {
    return {
      agentNo: '',
      rewardDate: '',
      searchHeight: '200',
      configData: SERVICE_CONFIG,
      searchConfig: SEARCH_CONFIG,
      testData: [],
      params: {},
      api: api_statistice.merchantqueryByPage
    }
  },
  created() {
    this.agentNo = this.$route.query.agentNo
    this.rewardDate = this.$route.query.tradeMonth
    this.params = {
      agentNo: this.agentNo,
      tradeMonth: this.rewardDate
    }
  },
  methods: {
    search($ruleform) {
      this.params = {
        agentNo: this.agentNo,
        merchantNo: $ruleform.inputSelect === 'merchantNo' ? $ruleform.inputForm : "",
        rewardDate: $ruleform.date ? $ruleform.date : '',
        merchantName: $ruleform.inputSelect === 'merchantName' ? $ruleform.inputForm : ""
      }
    }
  }
}
</script>

<style scoped>
  .table_box {
    margin: 24px;
    padding: 24px;
    background: white;
  }
</style>
