<template>
  <div class="main_page">
    <Search :is-show-all="true" :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />
    <div class="table_box">
      <div class="table-title">
        <li>间联</li>
        <li>直连</li>
        <li>直连官方分润</li>
      </div>
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
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      testData: [],
      params: {
        channelAgentCode: '',
        agentNo: this.$route.query.agentNo,
        tradeMonth: this.$route.query.tradeMonth
      },
      api: api_statistice.selectMerchantDataByPage,
      searchHeight: 88
    }
  },
  mounted() {
    this.getDate();
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      api_statistice.selectMerchantDataByPage({
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    search($ruleform) {
      this.tradeMonth = $ruleform.date
      const inputSelect = $ruleform.inputSelect
      if (inputSelect === 'merchantNo') {
        this.agentNo = $ruleform.inputForm
        this.channelAgentCode = ''
      } else {
        this.channelAgentCode = $ruleform.inputForm
        this.agentNo = ''
      }
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

