<template>
  <div>
    <div class="p_head">到期续费记录</div>
    <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
    />
    <div class="table_box">
      <BaseCrud
          ref="table"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :hide-edit-area="configData.hideEditArea"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="150"
          form-title="用户"
          :is-async="true"
          :is-select="false"
          :params="params"
          :api-service="api"
          @detail="go_detail"
      />
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { TABLE_CONFIG } from "./tableConfig/renewaldueList";
import { SEARCH_CONFIG } from "./formConfig/renewaldueSearch";

export default {
  name: "RenewalDue",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "380",
      configData: TABLE_CONFIG,
      searchConfig: SEARCH_CONFIG,
      testData: [],
      params: {},
      api: api.agentRenewRecord
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    search($form) {
      this.params = {
        beginDate: $form.date[0],
        endDate: $form.date[1],
        payType: $form.payType ? $form.payType : '',
        status: $form.status ? $form.status : '',
        auditStatus: $form.status === 1 ? 'audit' : $form.status === 2 ? 'success' : $form.status === 3 ? 'reject' : ''
      }
      this.params[$form.inputSelect] = $form.inputForm
    },
    go_detail(row) {
      this.$router.push({
        name: 'agentDetail',
        query: {
          agentNo: row.agentNo
        }
      })
    }
  }
}
</script>

<style scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
