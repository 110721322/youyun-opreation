<template>
  <div>
    <div class="p-head">到期续费记录</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table-box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :hide-edit-area="configData.hideEditArea"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        @detail="onClickGoDetail"
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
import { RenewalDue } from "@/libs/config/constant.config";

export default {
  name: "RenewalDue",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "380", // 搜索项展开高度
      configData: TABLE_CONFIG, // 列表展示参数
      searchConfig: SEARCH_CONFIG, // 搜索项的参数
      params: {}, // 搜索参数
      api: api.agentRenewRecord // 查询到期续费记录
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    search($form) {
      let auditStatus = null;
      switch ($form.status) {
        case RenewalDue.AUDIT_PENDING:
          auditStatus = 'audit';
          break;
        case RenewalDue.AUDIT_SUCCESS:
          auditStatus = 'success';
          break;
        case RenewalDue.AUDIT_REJECT:
          auditStatus = 'reject';
          break;
        default:
          auditStatus = null;
      }
      this.params = {
        beginDate: $form.date[0] ? $form.date[0] : null,
        endDate: $form.date[0] ? $form.date[1] : null,
        payType: $form.payType ? $form.payType : null,
        status: $form.status ? $form.status : null,
        auditStatus: auditStatus,
        [$form.search]: $form.searchVal
      }
    },

    // 点击进入详情页面
    onClickGoDetail(row) {
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
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
