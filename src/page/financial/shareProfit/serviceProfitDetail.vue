<template>
  <div>
    <Search :is-show-all="true" :form-base-data="searchConfig.formData" @search="search" />
    <div class="table_box">
      <ul class="table-title">
        <li>间联</li>
        <li>直连</li>
        <li>直连官方分润</li>
      </ul>
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
        :hide-edit-area="true"
      ></BaseCrud>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/serviceDetailSearch";
import { SERVICE_CONFIG } from "../tableConfig/serviceDetailConfig";
import api_statistice from "@/api/api_statistice"
export default {
  name: "ServiceProfitDetail",
  components: { Search, BaseCrud },
  data() {
    return {
      agentNo: '',
      tradeMonth: '',
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      testData: [],
      params: {},
      api: ""
    }
  },
  computed: {},
  mounted() {},
  created() {
    if (this.$route.query.mainIndex === 1) {
      this.api = api_statistice.selectMerchantDataByPage
      this.configData = SERVICE_CONFIG
    } else {
      this.api = api_statistice.selectTopAgentMerchantDetailByPage
      this.configData = SERVICE_CONFIG
    }
    this.agentNo = this.$route.query.agentNo
    this.tradeMonth = this.$route.query.tradeMonth
    this.params = {
      agentNo: this.agentNo,
      tradeMonth: this.tradeMonth
    }
  },
  methods: {
    search($ruleform) {
      api_statistice
        .selectByName({
          merchantName: $ruleform.inputForm
        })
        .then(result => {
          this.params = {
            merchantNo: $ruleform.inputForm ? result.object[0].merchantNo : "",
            tradeMonth: this.tradeMonth
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  DateNo() {
  }
}
</script>

<style scoped>
  .table_box {
    margin-top: 24px;
    padding: 32px 24px 0 24px;
  }
  .table-title {
    width: 100%;
    display: flex;
    padding-left: 31%;
    height: 52px;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
    color: #909399;
    font-size: 14px;
    background: #ffffff;
    line-height: 52px;
  }
  .table-title li:nth-child(1) {
    width: 43%;
  }
  .table-title li:nth-child(2) {
    width: 29%;
  }
</style>

